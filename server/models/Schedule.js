const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模板
const ScheduleSchema = new Schema({
  user: {
    // 关联数据表
    type: String,
    ref: 'users',
    required: true
  },
  schedule: Array
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);
