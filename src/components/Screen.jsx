import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import styles from '../routes/IndexPage.css'

const arr = ['ALL', 'S', 'M', 'L', 'XL', 'XXL'];

@connect(({ shopData }) => ({
  backupData: shopData.backupData,
  productData: shopData.productData,
}))
class Screen extends React.Component {
  state = {
    size: 'large',
    sizeKey: ''
  };
  onScreen = (key) => {
    const { backupData, dispatch } = this.props
    dispatch({
      type: 'shopData/screenData',
      payload: {
        data: backupData,
        key: key === 'ALL' ? '' : key,
        i: 1
      }
    })
    if (key == null) {
      this.sizeKey = 'ALL'
    } else {
      this.sizeKey = key
    }
  }

  render() {
    return (
      <>
        <div defaultselectedkeys={['2']}>
          <div>
            <h2 style={{ fontWeight: 'bold' }}>Sizes:</h2>
            <div>
              <Row>
                {arr.map((item, index) => (
                  <Col span={6} key={index}>
                    <Button className={item === this.sizeKey ? styles.btns : styles.btn} shape="circle" onClick={() => this.onScreen(item)}>{item}</Button>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default connect()(Screen);