const Order = require('../models/Order');

// POST create order (COD)
exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// GET all orders (admin)
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// GET single order
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// PUT /api/orders/:id
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;

    const validStatuses = ['placed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/stats/dashboard
exports.getDashboardStats = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const Product = require('../models/Product');
    const totalProducts = await Product.countDocuments();

    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((o) => o.orderStatus !== 'cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const pendingOrders = orders.filter((o) => o.orderStatus === 'placed').length;
    const shippedOrders = orders.filter((o) => o.orderStatus === 'shipped').length;
    const deliveredOrders = orders.filter((o) => o.orderStatus === 'delivered').length;

    // Last 7 days ka revenue
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayOrders = orders.filter((o) => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= date && orderDate < nextDate;
      });

      const dayRevenue = dayOrders
        .filter((o) => o.orderStatus !== 'cancelled')
        .reduce((sum, o) => sum + (o.total || 0), 0);

      last7Days.push({
        date: date.toISOString().split('T')[0],
        orders: dayOrders.length,
        revenue: dayRevenue,
      });
    }

    // Top 5 products
    const productCount = {};
    orders.forEach((order) => {
      order.items?.forEach((item) => {
        const key = item.name;
        if (!productCount[key]) {
          productCount[key] = { name: item.name, count: 0, revenue: 0 };
        }
        productCount[key].count += item.qty || 1;
        productCount[key].revenue += (item.price || 0) * (item.qty || 1);
      });
    });

    const topProducts = Object.values(productCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json({
      totalOrders,
      totalProducts,
      totalRevenue,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      last7Days,
      topProducts,
    });
  } catch (err) {
    next(err);
  }
};