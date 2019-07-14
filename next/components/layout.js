import Header from './header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

/* eslint-disable react/prop-types */
const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
    <style jsx global>{`
      .header + * {
        margin-top: 50px;
      }
    `}</style>
  </div>
);

export default Layout;
