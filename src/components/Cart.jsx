import React from 'react';
import { connect } from 'dva';
import { Button, List } from 'antd';
import {
  LoadingOutlined,
  CloseSquareOutlined,
} from '@ant-design/icons';

@connect(({ cart }) => ({
  cartData: cart.cartData,
  amount: cart.amount
}))
class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      key: 0, size: []
    }
  }

  changeOne = (key, id, size) => {
    const { dispatch } = this.props
    dispatch({
      type: 'cart/changeOne',
      payload: {
        key,
        id,
        size
      }
    })
  }

  removeData = async (id, size) => {
    const { dispatch } = this.props
    await dispatch({
      type: 'cart/remoteOne',
      payload: {
        id,
        size
      }
    })
  }

  settlement = async () => {

    await this.setState({
      key: 1
    })

    const { dispatch } = this.props
    await setTimeout(() => {
      dispatch({
        type: 'cart/settlementData',
      })
      this.setState({
        key: 0
      })
    }, 3000);


  }

  render() {
    const { key } = this.state

    const { cartData, amount } = this.props
    return (
      <div style={{ height: 700 }}>
        <div style={{ height: '75%', overflow: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={cartData}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button.Group size="small">
                    <Button style={{ margin: '0 3px' }} onClick={() => this.changeOne(-1, item.id, item.size)} disabled={item.number === 1}> - </Button>
                    <Button style={{ margin: '0 3px' }} onClick={() => this.changeOne(1, item.id, item.size)}> + </Button>
                  </Button.Group>,
                  <div>
                    <CloseSquareOutlined onClick={() => this.removeData(item.id, item.size)} style={{ fontSize: '16px' }} />
                  </div>

                ]}
              >
                <List.Item.Meta
                  avatar={<img src={`./img/${item.sku}_2.jpg`} alt="1" style={{ width: '50%' }} />}
                  title={item.title}
                  description={item.size + " | " + item.style}
                />
                <h3>x {item.number}</h3>
              </List.Item>
            )}
          />
        </div>
        <div style={{ height: '25%' }}>
          <h3 style={{ textAlign: 'center' }}>{`The total price:`}<span style={{ fontSize: '20px', color: '#E4BA2A' }}>${amount.toFixed(2)}</span></h3>
          <Button onClick={() => this.settlement()} disabled={amount.toFixed(2) <= 0.00} size="large" block>{key ? <div style={{ color: 'red' }}>SETTLEMENTING...</div> : <div>CHECKOUT</div>}</Button>
          {this.state.key ? (<div className="icons-list" style={{ fontSize: "50px", textAlign: "center" }}>
            <LoadingOutlined spin style={{ color: '#1890FF' }} />
          </div>) : null}
        </div>
      </div>
    )
  }
}
export default Cart;