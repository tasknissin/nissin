import Header from './header/Header'
import subHeader from './header/Subheader'
import Content from './content/Content';
import ManageTree from './manage/manageTree.vue'
import menuTree from './manage/muneTree.vue'
export default {
    //编写插件
    install(Vue) {
        // console.log('install方法调用了');
        Vue.component(Header.name, Header);
        Vue.component(subHeader.name, subHeader);
        Vue.component(Content.name, Content);
        Vue.component(ManageTree.name, ManageTree);
        Vue.component(menuTree.name, menuTree)

    }
}