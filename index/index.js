const app = getApp()

Page({
  data: {
    banner2Info: 'Banner 2 infomation',
    subMenus: (() => {
      const m = []
      for (let i = 0; i < 20; i++) {
        m.push(i + 1)
      }
      return m
    })(),
    goods: (() => {
      const m = []
      for (let i = 0; i < 50; i++) {
        m.push(i + 1)
      }
      return m
    })()
  },
  onLoad() {
    this.initScrollView()
  },

  onContainerScroll(e) {
    // console.log(e.detail.scrollTop)
    let top = e.detail.scrollTop
    if (top >= this.bannerHeight) {
      if (!this.data.fixLeft) {
        this.setData({
          fixLeft: true
        })
      }
    } else if (this.data.fixLeft) {
      this.setData({
        fixLeft: false
      })
    }
  },

  onLeftDragStart() {
    this.leftNode.showScrollbar = false
  },

  async initScrollView(n) {
    const sq = wx.createSelectorQuery()
    const containerNodeRef = sq.select('.container')
    const goodContentLeftNodeRef = sq.select('.good-content_left')
    const bannerNodeRef = sq.select('.banner')
    const banner2NodeRef = sq.select('.banner2')
    const containerPromise = new Promise(resolve => containerNodeRef.node(wn => {
        wn.node.showScrollbar = false
        resolve(wn)
      })
    )
    const goodContentLeftPromise = new Promise(resolve => 
      goodContentLeftNodeRef.fields({id: true, node: true}, wn => {
        resolve(wn)
      })
    )
    bannerNodeRef.fields({size: true}, n => this.bannerHeight = n.height)
    banner2NodeRef.fields({size: true}, n => {
      this.banner2Height = n.height;
        this.setData({
          fixStyle: `top: ${n.height}px;`
       })
    })
  
    sq.exec()
    const containerNode = await containerPromise;
    const leftWNode = await goodContentLeftPromise
    const leftNode = leftWNode.node
    leftNode.showScrollbar = false

    this.containerNode = containerNode
    this.leftNode = leftNode

    // const observer = wx.createIntersectionObserver(this, {
    //   thresholds: [0, 0.98, 1]
    // })
    // observer.relativeTo('.container')
    //   .observe('#banner2', res => {
    //     console.log(res)
    //     if (res.intersectionRatio <= 0.98) {
    //       if (!this.data.fixLeft) {
    //         this.setData({
    //           fixLeft: true
    //         })
    //       }
    //     } else if (this.data.fixLeft) {
    //       this.setData({
    //         fixLeft: false
    //       })
    //     }
    //   })
  }
})
