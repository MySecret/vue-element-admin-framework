import { login, logout, getInfo, getRoleModule, getBtnsModule } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, getOrgName, setOrgName, removeOrgName } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    userId: "",
    org_name: "",
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    infos: {},
    permissionBtns: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERID: (state, userId) => {
        state.userId = userId
    },
    SET_ORGNAME: (state, org_name) => {
        state.org_name = org_name
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_INFOS: (state, infos) => {
        state.infos = infos
    },
    SET_PERMISSIONBTNS: (state, btns) => {
        state.permissionBtns = btns
    },
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ userCode: username.trim(), userPassword: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                commit('SET_USERID', data.userId)
                commit('SET_ORGNAME', data.org_name || "")
                setToken(data.token)
                setUserId(data.userId)
                setOrgName(data.org_name || "")
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(getUserId()).then(response => {
                commit('SET_INFOS', response.data);
                commit('SET_NAME', response.data.user_name);
                commit('SET_AVATAR', response.data.headImage);
                commit('SET_ROLES', response.data.roleList);
            })
            getBtnsModule().then(response => {
                commit('SET_PERMISSIONBTNS', response.data);
            });
            getRoleModule().then(response => {
                if (response.data && response.data.length > 0) {
                    resolve(response.data);
                } else {
                    reject('没有权限模块，请联系管理员！');
                }
            })
            // new Promise((resolve, reject) => {
            //     resolve({
            //         data: {
            //             roles: ['admin'],
            //             introduction: 'I am a super administrator',
            //             avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            //             name: 'Super Admin'
            //         }
            //     });
            // }).then(response => {
            //     const { data } = response

            //     if (!data) {
            //         reject('Verification failed, please Login again.')
            //     }

            //     const { roles, name, avatar, introduction } = data

            //     // roles must be a non-empty array
            //     if (!roles || roles.length <= 0) {
            //         reject('getInfo: roles must be a non-null array!')
            //     }

            //     commit('SET_ROLES', roles)
            //     commit('SET_NAME', name)
            //     commit('SET_AVATAR', avatar)
            //     commit('SET_INTRODUCTION', introduction)
            //     resolve(data)
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_USERID', '')
            commit('SET_ORGNAME', '')
            commit('SET_ROLES', [])
            removeToken()
            removeUserId()
            removeOrgName()
            resetRouter()

            // reset visited views and cached views
            // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
            dispatch('tagsView/delAllViews', null, { root: true }).then(() => {
                resolve()
            })
            // logout().then(() => {
            //     commit('SET_TOKEN', '')
            //     commit('SET_ROLES', [])
            //     removeToken()
            //     resetRouter()

            //     // reset visited views and cached views
            //     // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
            //     dispatch('tagsView/delAllViews', null, { root: true })

            //     resolve()
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_USERID', '')
            commit('SET_ORGNAME', '')
            commit('SET_ROLES', [])
            removeToken()
            removeUserId()
            removeOrgName()
            resolve()
        })
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'

        commit('SET_TOKEN', token)
        setToken(token)

        const { roles } = await dispatch('getInfo')

        resetRouter()

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}