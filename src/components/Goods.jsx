import React from 'react';
import { connect } from 'dva';
import { Card, Button, Popover, List, Tooltip, notification, Row, Col } from 'antd';
import {
    SyncOutlined,
} from '@ant-design/icons';
import styles from '../routes/IndexPage.css'

const arr = ['default', 'up', 'down'];

@connect(({ shopData, cart }) => ({
    productData: shopData.productData,
    cartData: cart.cartData,
    amount: cart.amount,
    count: cart.count
}))

class Goods extends React.Component {
    constructor() {
        super()
        this.state = {
            key: 0,
            visible: [],
            sizeKey: ''
        }
    }

    // 
    onCollate = async (key) => {
        const { productData, dispatch } = this.props
        await dispatch({
            type: 'shopData/screenData',
            payload: {
                data: productData,
                key: key === 'DEFAULT' ? '' : key,
                i: 0
            }
        })
        if (key == null) {
            this.setState({ sizeKey: 'DEFAULT' })
            // this.sizeKey = 'DEFAULT'
        } else {
            this.setState({ sizeKey: key })
        }

        // console.log(this.sizeKey);
    }
    // 

    async componentDidMount() {
        const { dispatch } = this.props
        await this.setState({
            key: 1
        })
        await dispatch({
            type: 'shopData/GetData'
        })
        if (window.localStorage.cartData) {
            dispatch({
                type: 'cart/setStorage'
            })
        }
        await this.setState({
            key: 0
        })
    }

    addCart = async (data, size, index, type) => {
        const { dispatch } = this.props
        await dispatch({
            type: 'cart/addCart',
            payload: {
                data: data,
                size: size
            }
        })
        let arr = this.state.visible
        arr[index] = false
        this.setState({
            visible: arr,
        });
        //消息提示框
        notification[type]({
            message: 'Message tips',
            description:
                'Product added successfully!',
        });
    }

    handleVisibleChange = (e, index) => {
        let arr = this.state.visible
        arr[index] = e
        this.setState({ visible: arr });
    };


    render() {
        const { productData } = this.props
        const { sizeKey } = this.state
        const list = (productData || []).map((item, key) => {
            let newPrice = item.price + ''
            const newPrices = newPrice.split(".");
            const num1 = newPrices[0] //整数
            const num2 = newPrices[1] //小数
            return (
                <Card className="cart" style={{ width: 300, margin: 10, borderRadius: "3%" }} key={key}>
                    <Tooltip placement="rightTop" title="Free shopping">
                        <img src={`./img/${item.sku}_1.jpg`} alt={item.title + "_1.jpg"} style={{ width: 252 }}></img>
                    </Tooltip>
                    <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
                    <hr style={{ width: "10%", border: '1px solid #E9BE2B' }} />
                    <div style={{ textAlign: 'center' }}>
                        {/* <h3>{item.currencyFormat + num1 + '.' + num2}</h3> */}
                        <span style={{ fontSize: '20px' }}>{item.currencyFormat}</span>
                        <span style={{ fontSize: '30px' }}>{num1}</span>
                        <span>.</span>
                        <span style={{ fontSize: '20px' }}>{num2 ? num2 : 0}</span>
                    </div>
                    <Popover
                        content={
                            <List
                                size="small"
                                dataSource={item.availableSizes}
                                renderItem={size =>
                                    <List.Item>
                                        <Button onClick={() => this.addCart(item, size, key, 'success')} block>{size}</Button>
                                    </List.Item>}
                            />
                        }
                        title="Choose size"
                        visible={this.state.visible[key]}
                        trigger="click"
                        onVisibleChange={(e) => this.handleVisibleChange(e, key)}
                    >
                        <Button style={{ backgroundColor: 'black', color: "#fff" }} size="large" block>Add to cart</Button>
                    </Popover>
                </Card>
            )
        });
        return (
            <>
                <Row style={{ width: '100%' }}>
                    <Col sm={24} xl={12}>
                        <span style={{ fontWeight: 'bold', marginLeft: '50px',fontSize:'20px' }}>{` ${productData.length} Product(s) found.`}</span>
                    </Col>
                    <Col sm={24} xl={12}>
                        <span style={{ fontWeight: 'bold', fontSize:'20px' }} onChange={this.handleSizeChange}>Order by:</span>
                        <span>
                            {arr.map((item, index) => (
                                <Button className={item === sizeKey ? styles.btns : styles.btn} key={index} onClick={() => this.onCollate(item)} type="dashed" >{item.toLocaleUpperCase()}</Button>
                            ))}
                        </span>
                    </Col>
                </Row>
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                    {this.state.key ? (<div className="icons-list" style={{ fontSize: "50px", textAlign: "center" }}>
                        <SyncOutlined spin />
                    </div>) : list}
                </div>

            </>
        )
    }
}
export default Goods;