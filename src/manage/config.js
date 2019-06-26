let config = {
    "entity": null,
    "childs": [{
            "entity": {
                "id": 1,
                "parentMenuId": 0,
                "name": "系统管理",
                "icon": "el-icon-message\r\n",
                "alias": "系统管理",
                "state": "ENABLE",
                "sort": 0,
                "value": null,
                "type": "NONE",
                "createUserId": 1
            },
            "childs": [{
                    "entity": {
                        "id": 2,
                        "parentMenuId": 1,
                        "name": "部门管理",
                        "icon": "el-icon-loading",
                        "alias": "部门管理",
                        "state": "ENABLE",
                        "sort": 0,
                        "value": "test1",
                        "type": "LINK",
                        "createUserId": 1
                    },
                    "childs": null
                },
                {
                    "entity": {
                        "id": 3,
                        "parentMenuId": 1,
                        "name": "岗位管理",
                        "icon": "el-icon-bell",
                        "alias": "岗位管理",
                        "state": "ENABLE",
                        "sort": 1,
                        "value": "menuManagement",
                        "type": "LINK",
                        "createUserId": 1
                    },
                    "childs": null
                },
                {
                    "entity": {
                        "id": 4,
                        "parentMenuId": 1,
                        "name": "角色管理",
                        "icon": "el-icon-edit",
                        "alias": "角色管理",
                        "state": "ENABLE",
                        "sort": 2,
                        "value": "roleManagement",
                        "type": "LINK",
                        "createUserId": 1
                    },
                    "childs": null
                },

                {
                    "entity": {
                        "id": 5,
                        "parentMenuId": 1,
                        "name": "菜单管理",
                        "icon": "el-icon-mobile-phone\r\n",
                        "alias": "菜单管理",
                        "state": "ENABLE",
                        "sort": 3,
                        "value": "menu1",
                        "type": "LINK",
                        "createUserId": 1
                    },
                    "childs": null
                },
                {
                    "entity": {
                        "id": 6,
                        "parentMenuId": 1,
                        "name": "用户管理",
                        "icon": "el-icon-mobile-phone\r\n",
                        "alias": "用户管理",
                        "state": "ENABLE",
                        "sort": 4,
                        "value": "systemConfiguration",
                        "type": "LINK",
                        "createUserId": 1
                    },
                    "childs": null
                },
                {
                    "entity": {
                        "id": 7,
                        "parentMenuId": 1,
                        "name": "系统管理",
                        "icon": "el-icon-mobile-phone\r\n",
                        "alias": "系统管理",
                        "state": "ENABLE",
                        "sort": 5,
                        "value": "userManagement",
                        "type": "LINK",
                        "createUserId": 1
                    },
                    "childs": null
                },


            ]
        },
        // {
        //     "entity": {
        //         "id": 6,
        //         "parentMenuId": 0,
        //         "name": "系统配置",
        //         "icon": "el-icon-news",
        //         "alias": "系统配置",
        //         "state": "ENABLE",
        //         "sort": 1,
        //         "value": null,
        //         "type": "NONE",
        //         "createUserId": 1
        //     },
        //     "childs": []
        // },
        // {
        //     "entity": {
        //         "id": 9,
        //         "parentMenuId": 0,
        //         "name": "用户密码",
        //         "icon": "el-icon-rank",
        //         "alias": "用户密码",
        //         "state": "ENABLE",
        //         "sort": 2,
        //         "value": null,
        //         "type": "NONE",
        //         "createUserId": 1
        //     },
        //     "childs": []
        // }
    ]
}
export default config