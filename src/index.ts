/*
 * Copyright (c) 2024 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2024-06-12 19:48:53
 * @FilePath     : /src/index.ts
 * @LastEditTime : 2024-07-12 18:25:44
 * @Description  : 
 */
import {
    Plugin,
    openTab,
    getFrontend,
    getBackend,
    type IModel
} from "siyuan";
import "@/index.scss";

import { render } from 'solid-js/web'
import App from './App'

import type { } from "solid-styled-jsx";

const TAB_TYPE = 'custom_tab'


export default class PluginSample extends Plugin {
    customTab: () => IModel;

    async onload() {
        this.addTopBar({
            icon: 'iconEmoji',
            title: 'Test Solidjs',
            callback: () => {
                openTab({
                    app: this.app,
                    custom: {
                        icon: "iconFace",
                        title: "Halo Sync",
                        data: {
                            text: "This is my custom tab",
                        },
                        id: this.name + TAB_TYPE
                    },
                });
            }
        })
    }

    openSetting(): void {

    }

    onLayoutReady() {
        // this.loadData(STORAGE_NAME);
        console.log(`frontend: ${getFrontend()}; backend: ${getBackend()}`);

        this.customTab = this.addTab({
            type: TAB_TYPE,
            init() {
                const tabDiv = document.createElement("div");

                // mount app
                render(App, tabDiv)

                this.element.appendChild(tabDiv);
            },
            beforeDestroy() {
                console.log("before destroy tab:", TAB_TYPE);
            },
            destroy() {
                console.log("destroy tab:", TAB_TYPE);
            }
        });
    }
}
