<template>
  <div class="container">
    <div class="lin-info">
      <div class="lin-info-left">
        <div class="welcome">
          <div class="welcome-title">欢迎来到Chakki课堂管理系统</div>
          <div class="subtitle">
            <div class="guide">本系统为猪蹄的本科毕设，欢迎访问我的主页</div>
            <div class="link"><a href="https://www.gadfly.vip" target="_blank">https://www.gadfly.vip</a></div>
          </div>
        </div>
        <img class="welcome-bg" src="../../assets/image/about/header-bg.png" alt="" />
      </div>
      <div class="lin-info-right">
        <div class="team-detail">
          <div class="team-box">
            <div class="team-title">产品团队</div>
            <ul class="team-ul">
              <li>
                <span class="shadow-box"> <i class="team-shadow"></i> </span> <span class="team-role">策划</span>
                <span class="team-name">猪蹄</span>
              </li>
              <li>
                <span class="shadow-box"> <i class="team-shadow"></i> </span> <span class="team-role">研发</span>
                <span class="team-name">
                  <ul>
                    <li>猪蹄</li>
                  </ul>
                </span>
              </li>
              <li>
                <span class="shadow-box"> <i class="team-shadow"></i> </span> <span class="team-role">指导教师</span>
                <span class="team-name">江峰</span>
              </li>
            </ul>
          </div>
          <div class="team-icon">
            <a href="https://github.com/gadfly3173/chakki-vue" target="_blank">前端代码仓库</a>
            <a href="https://github.com/gadfly3173/chakki-spring" target="_blank">后端代码仓库</a>
          </div>
          <div class="team-label">
            <svg
              class="octicon octicon-law mr-1"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
              ></path>
            </svg>
            MIT License
          </div>
        </div>
      </div>
    </div>
    <div class="quantity-statistics">
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">Followers</div>
            <div class="quantity-border-line"></div>
            <div class="quantity">7</div>
          </div>
        </div>
        <div class="quantity-icon"><img src="../../assets/image/about/icon.png" alt="" /></div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">Following</div>
            <div class="quantity-border-line"></div>
            <div class="quantity">11</div>
          </div>
        </div>
        <div class="quantity-icon"><img src="../../assets/image/about/icon.png" alt="" /></div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">Highlights</div>
            <div class="quantity-border-line"></div>
            <div class="quantity" style="font-size: 14px; line-height: 18px; letter-spacing: 0">
              Arctic Code Vault Contributor
            </div>
          </div>
        </div>
        <div class="quantity-icon"><img src="../../assets/image/about/icon.png" alt="" /></div>
      </div>
      <div class="quantity-item">
        <div class="quantity-detail">
          <div class="quantity-detail-box">
            <div class="quantity-title">Repositories</div>
            <div class="quantity-border-line"></div>
            <div class="quantity">14</div>
          </div>
        </div>
        <div class="quantity-icon"><img src="../../assets/image/about/icon.png" alt="" /></div>
      </div>
    </div>
    <div class="information">
      <div class="personal">
        <div class="personal-title">个人信息</div>
        <a href="https://github.com/gadfly3173" target="_blank"
          ><img src="https://avatars.githubusercontent.com/u/28685179" class="personal-avatar"
        /></a>
        <a href="https://github.com/gadfly3173" target="_blank"><div class="personal-username">gadfly3173</div></a>
        <div class="personal-influence">
          <a class="personal-influence-item" href="https://github.com/gadfly3173?tab=followers" target="_blank">
            <div class="personal-influence-num color1">7</div>
            <div class="personal-influece-label">关注者</div>
          </a>
          <a class="personal-influence-item" href="https://github.com/gadfly3173?tab=following" target="_blank">
            <div class="personal-influence-num color2">11</div>
            <div class="personal-influece-label">关注中</div>
          </a>
          <a class="personal-influence-item" href="https://github.com/gadfly3173?tab=stars" target="_blank">
            <div class="personal-influence-num color3">89</div>
            <div class="personal-influece-label">星标</div>
          </a>
        </div>
        <el-tabs v-model="activeName" class="personal-tabs">
          <el-tab-pane label="最新博客" name="first">
            <div class="content">
              <a href="https://blog.gadfly.vip/2021/02/axios-xhr-with-cookie/" target="_blank"
                >Axios 发送请求时携带 Cookies</a
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="最热博客" name="second">
            <div class="content">
              <a href="https://blog.gadfly.vip/2019/09/about-ic-cards/" target="_blank">关于NFC和IC智能卡的一二三</a>
            </div>
            <div class="content">
              <a href="https://blog.gadfly.vip/2019/05/campus-card-research/" target="_blank">关于校园一卡通的初探索</a>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="article">
        <div class="article-title">私货博客</div>
        <div class="article-list">
          <a class="article-item" href="https://blog.gadfly.vip/2019/09/about-ic-cards/" target="_blank">
            <img class="article-thumb" src="https://blog.gadfly.vip/img/random/material-13.png" alt="" />
            <div class="article-detail">
              <p class="article-detail-title">关于NFC和IC智能卡的一二三</p>
              <div class="article-detail-content">
                近场通信技术（Near-field
                communication，NFC）由非接触式射频识别（RFID）演变而来，由飞利浦半导体（现恩智浦半导体）、诺基亚和索尼共同于2004年研制开发，
                其基础是RFID及互连技术。近场通信是一种短距高频的无线电技术，在13.56MHz频率运行于20厘米距离内。其传输速度有106
                Kbit/秒、212 Kbit/秒或者424 Kbit/秒三种。 当前近场通信已通过成为ISO/IEC IS
                18092国际标准、EMCA-340标准与ETSI TS 102 190标准。NFC采用主动和被动两种读取模式。
              </div>
              <div class="article-tool">
                <div class="pubdate">2019年9月29日</div>
                <div class="article-about">
                  <span><i class="iconfont icon-shoucang"></i>37</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="iconfont icon-pinglun"></i>2384</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="iconfont icon-fenxiang"></i>56</span>
                </div>
              </div>
            </div>
          </a>
          <a class="article-item" href="https://blog.gadfly.vip/2019/05/campus-card-research/" target="_blank">
            <img class="article-thumb" src="https://blog.gadfly.vip/img/random/material-12.png" alt="" />
            <div class="article-detail article-last">
              <p class="article-detail-title">关于校园一卡通的初探索</p>
              <div class="article-detail-content">
                校园一卡通涵盖了我们校园生活中的方方面面，吃饭喝水购物门禁都靠它，对于其工作方式我非常感兴趣，因此做了这次的探索。
                In the world of locked rooms, the man with the key is king. – Moriarty
                本文中提到的所有技术仅供学习研究作参考，请勿将其用于非法用途！！！
              </div>
              <div class="article-tool">
                <div class="pubdate">2019年5月7日</div>
                <div class="article-about">
                  <span><i class="iconfont icon-shoucang"></i>37</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="iconfont icon-pinglun"></i>2384</span>
                  <el-divider direction="vertical"></el-divider>
                  <span><i class="iconfont icon-fenxiang"></i>56</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      showTeam: false,
    }
  },
  mounted() {
    if (document.body.clientWidth > 1200 && document.body.clientWidth < 1330) {
      this.showTeam = true
    }
  },
  methods: {
    handleArticle(link) {
      window.open(link)
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  .lin-info {
    display: flex;
    flex: 1;
    height: 160px;
    width: 100%;
    .lin-info-left {
      position: relative;
      width: 690px;
      height: 100%;
      background: rgba(69, 119, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      .welcome {
        margin: 28px 0 0 30px;
        .welcome-title {
          font-size: 28px;
          font-weight: 300;
          letter-spacing: 2px;
          color: #fff;
        }
        .subtitle {
          display: flex;
          flex-direction: column;
          margin-top: 16px;
          color: #fff;
          .guide {
            margin-right: 20px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }
          .link {
            margin-top: 6px;
            width: 160px;
            height: 22px;
            background: rgba(44, 95, 233, 1);
            border-radius: 11px;
            text-align: center;
            line-height: 20px;
            color: rgba(255, 255, 255, 1);
            padding: 0 5px;
          }
        }
      }
      .welcome-bg {
        position: absolute;
        bottom: 0;
        right: 10px;
        width: 393px;
        height: 121px;
      }
    }
    .lin-info-right {
      flex: 1;
      margin-left: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .team-detail {
        position: relative;
        height: 160px;
        background: rgba(255, 176, 139, 1);
        box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
        border-radius: 8px;

        .team-box {
          margin: 20px 0 0 22px;

          .team-ul {
            margin-top: 15px;

            li {
              height: 20px;
              line-height: 20px;
              margin-bottom: 15px;
              font-size: 14px;

              .shadow-box {
                position: relative;
                display: inline-block;
                margin-right: 10px;
                width: 14px;
                height: 14px;
                border-radius: 14px;
                background-color: #fff;
                transform: translateY(2px);

                .team-shadow {
                  position: absolute;
                  top: 25%;
                  left: 25%;
                  display: inline-block;
                  width: 6px;
                  height: 6px;
                  border-radius: 6px;
                  background-color: #ffb9a4;
                }
              }

              .team-role {
                display: inline-block;
                width: 60px;
                margin-right: 15px;
                font-weight: 400;
                color: #45526b;
              }

              .team-name {
                font-weight: 400;
                color: #fff;

                ul {
                  display: inline;

                  li {
                    display: inline;
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }

        .team-icon {
          position: absolute;
          top: 25%;
          right: 33px;
          a {
            display: block;
            line-height: 30px;
          }
        }
        .team-label {
          position: absolute;
          top: 73%;
          right: 33px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(69, 82, 107, 1);
          line-height: 20px;
          .mr-1 {
            margin-right: 4px !important;
          }
          .octicon {
            vertical-align: text-bottom;
          }
          .octicon {
            display: inline-block;
            vertical-align: text-top;
            fill: currentColor;
          }
        }
      }
    }
  }
  .quantity-statistics {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    height: 90px;
    .quantity-item {
      display: flex;
      width: 23%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      .quantity-detail {
        flex: 1;
        .quantity-detail-box {
          margin: 12px 0 0 30px;
          .quantity-title {
            margin-bottom: 2px;
            height: 20px;
            line-height: 20px;
            color: #495468;
            font-size: 14px;
            font-weight: 700;
          }
          .quantity-border-line {
            width: 46px;
            height: 2px;
            background: rgba(73, 84, 104, 1);
          }
          .quantity {
            margin-top: 7px;
            height: 48px;
            font-size: 32px;
            color: rgba(73, 84, 104, 1);
            line-height: 38px;
            letter-spacing: 2px;
          }
        }
      }
      .quantity-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 100%;
        background: rgba(69, 119, 255, 0.1);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        img {
          width: 28px;
          height: 33px;
        }
      }
    }
  }
  .information {
    margin-top: 20px;
    display: flex;
    .personal {
      width: 320px;
      height: 100%;
      margin-right: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      .personal-title {
        margin: 20px 0 10px 20px;
        height: 22px;
        line-height: 22px;
        font-weight: 500;
        color: #596c8e;
        font-size: 16px;
      }
      .personal-username {
        font-size: 32px;
        font-weight: 600;
        text-align: center;
        margin: 0 auto 30px;
      }
      .personal-avatar {
        width: 140px;
        height: 140px;
        margin: 0 auto 20px;
        border-radius: 75px;
        box-shadow: 0 0 30px 0 #cfd5e3;
      }
      .personal-influence {
        display: flex;
        justify-content: space-between;
        padding: 0 30px 20px;
        .personal-influence-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .personal-influence-num {
            font-size: 28px;
            line-height: 34px;
            &.color1 {
              color: #00c292;
            }
            &.color2 {
              color: #fec108;
            }
            &.color3 {
              color: #03a9f3;
            }
          }
          .personal-influece-label {
            font-size: 12px;
            font-weight: 400;
            color: #8c98ae;
            line-height: 17px;
          }
        }
      }
      .personal-tabs {
        margin-bottom: 20px;
        .content {
          height: 36px;
          font-size: 16px;
          font-weight: 400;
          color: #45526b;
          line-height: 36px;
          border-bottom: 1px #ecedef solid;
        }
      }
      .personal-tabs /deep/ .is-top {
        width: 320px;
        display: flex;
        justify-content: space-around;
      }
      .personal-tabs /deep/ .el-tabs__header {
        margin: 0 0 10px;
      }
      .personal-tabs /deep/ .el-tabs__content {
        text-indent: 20px;
      }
    }
    .article {
      flex: 1;
      height: 100%;
      padding: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      .article-title {
        height: 22px;
        line-height: 22px;
        font-weight: 500;
        color: #596c8e;
        font-size: 16px;
        margin-bottom: 20px;
      }
      .article-list {
        cursor: pointer;
        .article-item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;

          .article-thumb {
            width: 120px;
            height: 120px;
            border-radius: 8px;
            margin-right: 30px;
          }
          .article-detail {
            flex: 1;
            border-bottom: 1px #ecedef solid;
            margin-bottom: 20px;
            &.article-last {
              border-bottom: none;
              margin-bottom: 0;
            }
            .article-detail-title {
              height: 22px;
              font-size: 16px;
              font-weight: 400;
              color: rgba(69, 82, 107, 1);
              line-height: 22px;
            }
            .article-detail-content {
              margin-top: 10px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(140, 152, 174, 1);
              line-height: 22px;
            }
          }
          .article-tool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 10px 0 20px 0;
            font-size: 12px;
            line-height: 17px;
            font-weight: 400;
            color: #808da3;
            .article-about {
              .iconfont {
                line-height: 17px;
                margin-right: 6px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .container .lin-info .lin-info-right {
    display: none;
  }
  .container .lin-info .lin-info-left {
    width: 100%;
  }
  .container .quantity-statistics .quantity-item {
    width: 32%;
    &:last-child {
      display: none;
    }
  }
  .container .information .personal {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .container .lin-info .lin-info-left {
    width: 100%;
  }
}
</style>
