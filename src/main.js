import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Uploader, Field, Area, Popup, Picker, NoticeBar, Swipe, SwipeItem, Overlay, ImagePreview,Toast} from 'vant';
createApp(App).config.globalProperties.$http = () => { }
createApp(App).use(store).use(router)
    .use(Uploader).use(Area).use(Field).use(Popup)
    .use(Picker).use(NoticeBar).use(Swipe).use(ImagePreview).use(SwipeItem).use(Overlay).use(Toast).mount('#app')
