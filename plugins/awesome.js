import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF, faTwitter, faGooglePlusG, faVk, faOdnoklassniki } from '@fortawesome/free-brands-svg-icons'
import { faAd, faDesktop, faTh, faDrawPolygon, faCreditCard, faUsers, faCog, faSlidersH, faBell, faUser, faSearch, faCat, faHeart, faReceipt, faShoppingBag, faBullseye, faChevronRight, faPlus, faMobileAlt, faTrashAlt, faChevronLeft, faSignOutAlt, faCaretUp, faPencilAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

library.add(faFacebookF, faTwitter, faAd, faDesktop, faTh, faDrawPolygon, faCreditCard, faUsers, faGooglePlusG, faVk, faOdnoklassniki, faCog, faSlidersH, faBell, faUser, faSearch, faQuestionCircle, faCat, faHeart, faReceipt, faShoppingBag, faBullseye, faChevronRight, faPlus, faMobileAlt, faTrashAlt, faChevronLeft, faSignOutAlt, faCaretUp, faPencilAlt, faEllipsisH)


Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false
