import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TransactionsView from '../views/TransactionsView.vue'
import MovementsView from '../views/MovementsView.vue'
import EditTransaction from '../views/EditTransactionView.vue'
import State from '../views/StateView.vue'
import Investments from '../views/InvestmentsView.vue'
import WhereBuy from '../views/WhereBuyView.vue'
import WhereSell from '../views/WhereSellView.vue'
import TransactionView from '../views/ViewTransactionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: TransactionsView,
  },
  {
    path: "/state",
    name: "EstadoActual",
    component: State,
  },
  {
    path: "/transaction-edit",
    name: "EditTransaction",
    component: EditTransaction,
  },
  {
    path: '/movements',
    name: 'Movements',
    component:MovementsView
  },
  {
    path: '/investments',
    name: 'Investments',
    component:Investments
  },
  {
    path: '/where-buy',
    name: 'WhereBuy',
    component:WhereBuy
  },
  {
    path: '/where-sell',
    name: 'WhereSell',
    component:WhereSell
  },
  {
    path: '/transaction',
    name: 'TransactionView',
    component:TransactionView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
