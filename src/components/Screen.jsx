import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
// import { ProjectOutlined, } from '@ant-design/icons';
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
    // console.log(this.sizeKey);
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
                {/* <Col span={6}> 
                  <Button  className={styles.btn} shape="circle" key="setting:6" onClick={() => this.onScreen()}>ALL</Button>
                </Col>
                <Col span={6}>
                  <Button className={styles.btn} shape="circle" key="setting:1" onClick={() => this.onScreen("S")}>S</Button>
                </Col>
                <Col span={6}>
                  <Button className={styles.btn} shape="circle" key="setting:2" onClick={() => this.onScreen('M')}>M</Button>
                </Col>
                <Col span={6}>
                  <Button className={styles.btn} shape="circle" key="setting:3" onClick={() => this.onScreen('L')}>L</Button>
                </Col>
                <Col span={6}>
                  <Button className={styles.btn} shape="circle" key="setting:4" onClick={() => this.onScreen('XL')}>XL</Button>
                </Col>
                <Col span={6}>
                  <Button className={styles.btn} shape="circle" key="setting:5" onClick={() => this.onScreen('XXL')} >XXL</Button>
                </Col> */}
              </Row>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default connect()(Screen);