<!--
    /**
       评论 楼层
     */
-->

<template>
  <el-form ref="mainForm" label-width="60px">
    <el-row>
      <el-col>
        <el-form-item>
          <span slot="label"
            ><img
              class="comimgrt"
              :src="require('../../../../assets/image/comment/rt.png')"
          /></span>
          <el-row type="flex" justify="space-between">
            <el-row>
              <el-row>
                <el-col>
                  <label class="nm">{{ info.InputerName }}</label>
                  <label class="sj">{{ info.InputDateName }}</label>
                </el-col>
              </el-row>
              <el-row style="margin-top: 5px">
                {{ info.Comment }}
              </el-row>
            </el-row>
            <el-row class="detialright">
              <el-row>
                <el-col :span="8" style="text-align: right; padding-right: 5px">
                  <img
                    :src="require('../../../../assets/image/comment/ok.png')"
                  />
                </el-col>
                <el-col :span="16" class="sdhu">
                  <el-link @click="sdclick">收到</el-link> |
                  <el-link>回复</el-link>
                </el-col>
              </el-row>
              <el-row style="margin-top: 5px" type="flex" align="middle">
                <el-col :span="8" style="text-align: right; padding-right: 5px">
                  <img
                    class="detialrt"
                    :src="require('../../../../assets/image/comment/rt.png')"
                  />
                </el-col>
                <el-col :span="16" class="detialsd">
                  {{ info.Count }}人收到
                </el-col>
              </el-row>
            </el-row>
          </el-row>
          <el-row>
            <div class="content">
              <img
                v-for="src in info.attList"
                :src="'http://lqtex.oss-cn-hangzhou.aliyuncs.com/' + src.Url"
                :key="src.Url"
                :preview="1"
                :preview-text="src.FullName"
              />
            </div>
          </el-row>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-divider></el-divider>
    </el-row>
  </el-form>
</template>
<script>
import { SaveReceived, QueryCommentById } from '@/http/moudules/commneton'
export default {
  name: 'comment-detail',
  props: {
    //直接用guid对应数据
    Item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      info: this.Item,
      imgs: [
        {
          url:
            'http://lqtex.oss-cn-hangzhou.aliyuncs.com/CommentOn/2021/f2e0ee46fd294f17af55c1addb3af431.png',
          title: '图片1',
          preview: '1',
        },
        {
          url:
            'http://lqtex.oss-cn-hangzhou.aliyuncs.com/CommentOn/2021/f2e0ee46fd294f17af55c1addb3af431.png',
          title: '图片2',
          preview: '1',
        },
      ],
    }
  },
  methods: {
    sdclick() {
      SaveReceived({ id: this.Item.Id })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '保存成功',
              type: 'success',
            })
            this.queryItem()
          }
        })
        .catch((err) => console.log(err))
    },
    queryItem() {
      QueryCommentById({ id: this.Item.Id })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.info = res.data
          }
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>
<style lang="scss" scoped>
.comimgrt {
  width: 50px;
  height: 50px;
}
.detialright {
  padding-left: 5px;
  width: 125px;
}
.sdhu >>> .el-link--inner {
  font-size: 12px;
  color: #666666;
}
.detialsd {
  font-size: 12px;
  padding-left: 5px;
  color: #bbbbbb;
}
.detialrt {
  width: 28px;
  height: 28px;
}
.nm {
  color: #5473e8;
}
.sj {
  color: #908fa0;
  margin-left: 10px;
  font-size: 10px;
}
.content img {
  width: 50px;
  height: 50px;
  padding: 0 5px;
}

>>> .el-form-item__content {
  line-height: 22px;
}
/* el-divider 修改高度&虚线效果 */
.el-divider--horizontal {
  background: 0 0;
  border-top: 1px dashed #e8eaec;
}
</style>
