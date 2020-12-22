import React from 'react';
import { connect } from 'dva';
import { Layout, Drawer, Button,Badge, Row,Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from "./IndexPage.css"
import Goods from '../components/Goods'
import Cart from '../components/Cart';
import Screen from '../components/Screen'
const { Sider } = Layout;

@connect(({ cart }) => ({
  count: cart.count
}))
class IndexPage extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { Content, Footer } = Layout;
    const {count} = this.props
    return (
      <div>
        <Row>
          <Layout>
            <Col xs={24} xl={3}>
              <Sider width="300px" style={{backgroundColor:'#F0F2F5',flex: '0 0 300px'}}>
                <div className={styles.screen}>
                  <Screen/>
                </div>
              </Sider>
            </Col>
            <Col xs={24} xl={21}>
              <Layout className={styles.content}>
                <Content className="site-layout">
                  <div className={styles.productlist} style={{ padding: 24, minHeight: 580, display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around',width:'100%' }}>
                    <Goods />
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center',fontSize:"30px" }}></Footer>
              </Layout>
            </Col>
            <Col>
              <div style={{ position: 'fixed',zIndex: 2,top:0,right:0}} >
                <Badge count={count} showZero  offset={[-9, 28]} size="small" style={{backgroundColor:'#faad14'}}>
                  <Button type="primary" icon={<ShoppingCartOutlined />} onClick={this.showDrawer} size='large' style={{backgroundColor:'black',border:'none'}}/>
                </Badge>
              </div>
              <Drawer
                title="Shopping cart details"
                className={styles.drawer}
                placement="right"
                onClose={this.onClose}
                visible={this.state.visible}
              >
              <Cart />
              </Drawer>
            </Col>
          </Layout>
        </Row>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
