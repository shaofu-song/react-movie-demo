import React, { Component } from 'react'

import { Button, Icon, Spin, Alert } from 'antd';

import fetchJSONP from 'fetch-jsonp'

export default class MovieDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {},//电影信息对象
            isloading: true
        }
    }
    
    UNSAFE_componentWillMount(){
        fetchJSONP('https://douban.uieee.com/v2/movie/subject/' + this.props.match.params.id )
        .then(res => res.json())
        .then(data => {
            this.setState({
                info: data,
                isloading: false
            })
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.goBack}>
                    <Icon type="left" />
                    返回电影列表
                </Button>
                {this.renderInfo()}
            </div>
        )
    }

    goBack = () => {
        this.props.history.go(-1)
    }

    renderInfo = () => {
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
            return (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <h1>{this.state.info.title}</h1>
                        <img src={this.state.info.images.large.replace('img3', 'img1')}></img>
                    </div>
                    
                    <p style={{ textIndent: '2em', lineHeight: '30px' }}>{this.state.info.summary}</p>
                </div>
            )
        }
    }
}
