import PopupManager from './popup-manager'
export {default as overlay} from './overlay'
export {getZIndex} from './utils'

export default {
  data(){
    return {
      mShow:this.show
      // ,
      // mOverlay:this.overlay,
      // mOverlayOpacity:this.overlayOpacity,
      // mOverlayColor:this.overlayColor
    }
  },
  props: {
    // value,
    show: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    },
    overlayOpacity: {
      type: Number,
      default: 0.4
    },
    overlayColor: {
      type: String,
      default: '#000'
    }
  },
  attached () {
    if (this.show && this.overlay) {
      PopupManager.open(this)
    }
  },
  detached () {
    PopupManager.close(this)
  },
  watch: {
    show (val) {
      console.log(val)
      this.mShow=this.show
      if (val && this.overlay) {
        PopupManager.open(this)
      } else {
        PopupManager.close(this)
      }
    },
    mShow(val){
      this.$emit('update:show', val)
    }
  },
  beforeDestroy () {
    PopupManager.close(this)
  }
}