import React, { Component } from 'react'

//导入UI组件
import { Spin, Alert, Pagination } from 'antd';

//导入fetch-jsonp
import fetchJSONP from 'fetch-jsonp'
//import { setTimeout } from 'timers';

//导入电影框
import MovieItem from './MovieItem'

export default class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],//电影列表
            nowPage: parseInt(props.match.params.page) || 1,//当前展示第几页的数据
            pageSize: 12,//每页显示多少数据
            total: 0, //当前电影分类下共有多少数据
            isloading: true, //数据是否正在加载
            movieType: props.match.params.type //保存要获取的电影类型
        }
    }

    UNSAFE_componentWillMount() {
        // setTimeout(() => {
        //     //假设1秒后数据回来
        //     this.setState({
        //         isloading: false//数据回来后，isloading设为false
        //     })
        // }, 1000);

        this.loadMovieListByTypeAndPage()
    }

    //组件将要接受新属性
    UNSAFE_componentWillReceiveProps(nextProps){
        //每当地址栏变化的时候，重置state中的参数项
        this.setState({
            isloading: true, //又要重新加载电影数据
            nowPage: parseInt(nextProps.match.params.page) || 1, //要获取第几页数据
            movieType: nextProps.match.params.type //电影类型
        },function () {
            //console.log(this.state)
            this.loadMovieListByTypeAndPage()
        })
    }

    render() {
        return (
             <div>
                 {this.renderList()}
             </div>
        )
    }

    //根据电影类型和页码,获取电影数据
    loadMovieListByTypeAndPage = () => {
        //注意：默认的window.fetch受到跨域限制，使用第三方包fetch-jsonp请求，他的用法和浏览器内置的
        // fetch完全兼容

        // 开始获取数据的索引
        const start = this.state.pageSize * (this.state.nowPage - 1)

        const url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`

        fetchJSONP(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            this.setState({
                isloading: false, //将loading效果隐藏
                movies: data.subjects, //为电影列表重新赋值
                total: data.total //把总条数保存到state上
            })
        })

        
        // const data = require ('../test_data/in_theaters.json')
        // setTimeout(() => {
        //     this.setState({
        //         isloading: false, //将loading效果隐藏
        //         movies: data.subjects, //为电影列表重新赋值
        //         total: data.total //把总条数保存到state上
        //     })
        // }, 1000);
    }

    //渲染电影列表的方法
    renderList = () => {
        if (this.state.isloading) {
            return (
                <Spin tip="Loading...">
                    <Alert
                        message="电影数据正在加载"
                        description="精彩内容马上呈现"
                        type="info"
                    />
                </Spin> 
            )
        }else{
            return (<div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.state.movies.map(item => {
                        return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
                    })}
                </div>
                {/*分页*/}
                <Pagination defaultCurrent={this.state.nowPage} 
                pageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChanged} style={{ marginBottom: '2px' }}/>
            </div>
            )
        }
    }

    //当页码改变时加载新一页数据
    pageChanged = (page) => {
        //由于手动使用BOM对象，实现了跳转，应用路由方法，进行编程式导航
        // window.location.href = '/#/movie/' + this.state.movieType + '/' + page
        //使用react-router-dom实现编程式导航
        this.props.history.push('/movie/' + this.state.movieType + '/' + page)
    }
}
