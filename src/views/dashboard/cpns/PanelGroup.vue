<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <el-icon :size="50">
              <avatar />
            </el-icon>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">用户总数</div>
            <count-up
              :startVal="0"
              :endVal="userCount"
              :duration="3"
              class="card-panel-num"
            ></count-up>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <el-icon :size="50">
              <goods />
            </el-icon>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">商品数量</div>
            <count-up
              :startVal="0"
              :endVal="goodCount"
              :duration="3"
              class="card-panel-num"
            ></count-up>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <el-icon :size="50">
              <notebook />
            </el-icon>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">订单总数</div>
            <count-up
              :startVal="0"
              :endVal="orderCount"
              :duration="3"
              class="card-panel-num"
            ></count-up>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <el-icon :size="50">
              <coin />
            </el-icon>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">销售总额</div>
            <count-up
              :startVal="0"
              :endVal="saleCount"
              :duration="3"
              class="card-panel-num"
            ></count-up>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import CountUp from 'vue-countup-v3'

export default defineComponent({
  components: { CountUp },
  props: {
    userCount: {
      type: Number,
      default: 0
    },
    goodCount: {
      type: Number,
      default: 0
    },
    orderCount: {
      type: Number,
      default: 0
    },
    orderList: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // console.log(props.orderList)
    const saleCount = ref(0)
    props.orderList.forEach((item: any) => {
      saleCount.value += item?.total_price
    })
    // console.log(saleCount.value)

    return {
      saleCount
    }
  }
})
</script>

<style lang='scss' scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>