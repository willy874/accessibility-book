/**
 * @typedef {import('vue')} Vue
 */
/**
 * @typedef {import('vue').VNode} VNode
 */
/**
 * @typedef {import('vue').VNodeData} VNodeData
 */
/**
 * @typedef {import('vue-router').default} VueRouter
 */
/**
 * @typedef {import('vue-router').Location} VueRouteLocation
 */
/**
 * @typedef {import('vue-router').Route} Route
 */
/**
 * @template V
 * @typedef {import('vue-router').NavigationGuard<V>} NavigationGuard
 */
/**
 * @typedef {Object} VuePluginOptions
 * @property {VueRouter} $router
 * @property {Store} $store
 */
/**
 * @typedef {import('vue').ComponentOptions} ComponentOptions
 */
/**
 * @template {object | (() => object)} D
 * @typedef {D extends () => object ? ReturnType<D> : D} Data
 */
/**
 * @template {Record<string,(...args: any) => any>} C
 * @typedef {{[P in keyof C]: ReturnType<C[P]> }} Computed
 */
/**
 * @typedef {Record<string, any>} DefaultProps
 */
/**
 * @template T
 * @typedef {import('vue/types/options').PropsDefinition<T>} PropsDefinition
 */
/**
 * @template T
 * @typedef {import('vue/types/options').ArrayPropsDefinition<T>} ArrayPropsDefinition
 */
/**
 * @template T
 * @typedef {import('vue/types/options').PropOptions<T>} PropOptions
 */
/**
 * @template T
 * @typedef {import('vue/types/options').Prop<T>} PropType
 */
/**
 * @template T,U,D
 * @typedef {T extends U ? T : D} ExcludeDefault
 */
/**
 * @template T
 * @typedef {T extends abstract new (...args: any) => any ? InstanceType<T> : (T extends (...args: any) => any ? ReturnType<T> : T)} InferPropType
 */
/**
 * @template P
 * @typedef {P extends (infer U)[] ? U : P} InferArrayType
 */
/**
 * @template T
 * @typedef {{ [K in keyof T]: T[K] extends PropOptions<any> ? InferPropType<InferArrayType<T[K]["type"]>> : InferPropType<InferArrayType<T[K]>> }} RecordPropsDefinition
 */
/**
 * @template P
 * @typedef {P extends Array<any> ? Record<string, any> : RecordPropsDefinition<P>} Props
 */

/**
 * @template D,M,C,P
 * @typedef {import("vue/types/vue").CombinedVueInstance<Vue,D,M,C,Readonly<P>>} CombinedVueInstance
 */
/**
 * @template {ComponentOptions} T
 * @typedef {CombinedVueInstance<Data<T["data"]>, T["methods"], T["computed"], T["props"]>} VueThisInstance
 */
