const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');

// 引入模板实例
const Schedule = require('../../models/Schedule');
const User = require('../../models/User');

// 引入验证
// const validateProfileInput = require('../../validation/profile');
// const validateExperienceInput = require('../../validation/experience');
// const validateEducationInput = require('../../validation/education');

/**
 * @route GET api/profile/test
 * @desc  测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
  ctx.status = 200;
  ctx.body = { msg: 'profile works...' };
});

/**
 * @route GET api/profile
 * @desc  个人信息接口地址
 * @access 接口是私有的
 */

router.get('/', passport.authenticate('jwt', { session: false }), async ctx => {
  console.log(1);
  console.log(ctx.state.user);
  const schedule = await Schedule.find({ user: ctx.state.user.id }).populate(
    'user',
    ['name', 'avatar']
  );

  console.log(schedule);
  if (schedule.length > 0) {
    ctx.status = 200;
    ctx.body = schedule;
  } else {
    ctx.status = 404;
    ctx.body = { noSchedule: '该用户没有任何相关的个人信息' };
    return;
  }
});

/**
 * @route POST api/profile
 * @desc  添加和编辑个人信息接口地址
 * @access 接口是私有的
 */

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    // const { errors, isValid } = validateProfileInput(ctx.request.body);

    // // 判断是否验证通过
    // if (!isValid) {
    //   ctx.status = 400;
    //   ctx.body = errors;
    //   return;
    // }
    const scheduleFields = {};

    scheduleFields.user = ctx.state.user.id;

    // if (ctx.request.body.location)
    //   scheduleFields.location = ctx.request.body.location;
    if (ctx.request.body.status) scheduleFields.status = ctx.request.body.status;


    // 查询数据库
    // const schedule = await Schedule.find({ user: ctx.state.user.id });
    const schedule = ctx.request.body.schedule;
    const newSchedule = new Schedule({
      schedule,
    });

    await newSchedule
      .save()
      .then(post => (ctx.body = post))
      .catch(err => (ctx.body = err));

    ctx.body = newSchedule;
  }
);




/**
 * @route DELETE api/profile/experience?exp_id=dfasdfa
 * @desc  删除工作经验接口地址
 * @access 接口是私有的
 */

router.delete(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    // 拿到id
    const exp_id = ctx.query.exp_id;
    // console.log(exp_id);

    // 查询
    const profile = await Profile.find({ user: ctx.state.user.id });
    if (profile[0].experience.length > 0) {
      // 找元素下标
      const removeIndex = profile[0].experience
        .map(item => item.id)
        .indexOf(exp_id);
      // 删除
      profile[0].experience.splice(removeIndex, 1);
      // 更新数据库
      const profileUpdate = await Profile.findOneAndUpdate(
        { user: ctx.state.user.id },
        { $set: profile[0] },
        { new: true }
      );

      ctx.body = profileUpdate;
    } else {
      ctx.status = 404;
      ctx.body = { errors: '没有任何数据' };
    }
  }
);

module.exports = router.routes();
