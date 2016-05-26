import 'css/main.css';
import Vue from 'vue';
import App from './components/App';
import store from 'js/vuex/store';

//the main entrance
/* eslint-disable no-new */
new Vue({el: 'body', components: {App}, store});
