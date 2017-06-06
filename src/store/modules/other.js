export default {
	state: {
		count: 0
	},
	getters: {
	},
	mutations:{
		increment (state, n) {
	    state.count += n
	  }
	} ,
	actions:{
	}
}


//store.commit('increment', 10)
//store.commit('increment', {
//amount: 10
//})

//store.commit({
//type: 'increment',
//amount: 10
//})
//mutations: {
//increment (state, payload) {
//  state.count += payload.amount
//}
//}


//import { mapMutations } from 'vuex'
//	...mapMutations([
//    'increment' // 映射 this.increment() 为 this.$store.commit('increment')
//  ]),
//  ...mapMutations({
//    add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
//  })

//实例触发
//store.dispatch('increment')
//this.$store.dispatch('increment')

// 以载荷形式分发
//store.dispatch('incrementAsync', {
//amount: 10
//})

// 以对象形式分发
//store.dispatch({
//type: 'incrementAsync',
//amount: 10
//})

//import { mapActions } from 'vuex'
//...mapActions([
//    'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
//  ]),
//  ...mapActions({
//    add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
//  })

//actions: {
//checkout ({ commit, state }, products) {
//  // 把当前购物车的物品备份起来
//  const savedCartItems = [...state.cart.added]
//  // 发出结账请求，然后乐观地清空购物车
//  commit(types.CHECKOUT_REQUEST)
//  // 购物 API 接受一个成功回调和一个失败回调
//  shop.buyProducts(
//    products,
//    // 成功操作
//    () => commit(types.CHECKOUT_SUCCESS),
//    // 失败操作
//    () => commit(types.CHECKOUT_FAILURE, savedCartItems)
//  )
//}
//}
