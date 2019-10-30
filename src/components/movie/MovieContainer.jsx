import React, { Component } from 'react'

//导入布局相关的组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//导入路由相关的组件
import { Route, Link, Switch } from 'react-router-dom'
//导入路由组件页面
import MovieList from './MovieList'
import MovieDetail from './MovieDetail'

export default class MovieContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                            <Menu.Item key="in_theaters">
                                <Link to='/movie/in_theaters/1'>正在热映</Link>
                            </Menu.Item>
                            <Menu.Item key="coming_soon">
                                <Link to='/movie/coming_soon/1'>即将上映</Link>
                            </Menu.Item>
                            <Menu.Item key="top250">
                                <Link to='/movie/top250/1'>Top250</Link>
                            </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ paddingLeft: '2px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 10,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {/*如从路由规则提取参数，须使用this.props.match*/}
                        <Switch>
                            <Route path="/movie/detail/:id" component={MovieDetail}></Route>
                            <Route path="/movie/:type/:page" component={MovieList}></Route>
                        </Switch>
              </Content>
                </Layout>
            </Layout>
        )
    }
}
