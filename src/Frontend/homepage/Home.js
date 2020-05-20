import React, { useContext,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Col, Card, Row } from 'antd';
import Axios from 'axios';
import UserContext from "../../contex/UserContext";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";
import Feature from "./Feature";
import Allproduct from "./ProductView/Allproduct";
import '../../web content/css/bootstrap.min.css';
import '../../web content/css/bootstrap.css';
import '../../web content/vendors/linericon/style.css';
import '../../web content/css/font-awesome.min.css';
import '../../web content/css/themify-icons.css';
import '../../web content/css/flaticon.css';
// import './web content/vendors/owl-carousel/owl.carousel.min.css';
// import './web content/vendors/lightbox/simpleLightbox.css';
// import './web content/vendors/nice-select/css/nice-select.css';
// import './web content/vendors/animate-css/animate.css';
// import './web content/vendors/jquery-ui/jquery-ui.css';
import '../../web content/css/style.css';
import '../../web content/css/responsive.css';
import SearchResultView from "./Search/SearchResultView";
const { Meta } = Card;
export default function Home() {
  const { userData } = useContext(UserContext);
  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerms, setSearchTerms] = useState("")

  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  })

  useEffect(() => {

    const variables = {
      skip: Skip,
      limit: Limit,
    }

    getProducts(variables)

  }, [])

  const getProducts = (variables) => {
    Axios.post('http://localhost:5000/products/getProducts', variables)
        .then(response => {
          if (response.data.success) {
            if (variables.loadMore) {
              setProducts([...Products, ...response.data.products])
            } else {
              setProducts(response.data.products)
            }
            setPostSize(response.data.postSize)
          } else {
            alert('Failed to fectch product datas')
          }
        })
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms
    }
    getProducts(variables)
    setSkip(skip)
  }


  const renderCards = Products.map((product, index) => {

    return<div className="col-lg-2 col-md-6">
      <div className="single-product">
        <div className="product-img">
          <img className="img-fluid w-100" src={product.url1} alt=""/>
          <div className="p_icon">
            <a href="#">
              <i className="ti-eye"></i>
            </a>
            <a href="#">
              <i className="ti-heart"></i>
            </a>
            <a href="#">
              <i className="ti-shopping-cart"></i>
            </a>
          </div>
        </div>
        <div className="product-btm">
          <a href="#" className="d-block">
            <h4>{product.productname}</h4>
          </a>
          <div className="mt-3">
            <span className="mr-4">Rs.{product.oprice}</span>
            <del className="color-red">Rs.{product.price}</del>
          </div>
        </div>
      </div>
    </div>



    // return <Col lg={6} md={8} xs={24}>
    //   <Card
    //       hoverable={true}
    //       cover={<a href={`/product/${product._id}`} > <img src={product.url1} /></a>}
    //   >
    //     <Meta
    //         title={product.productname}
    //         description={`$${product.oprice}`}
    //     />
    //   </Card>
    // </Col>
  })


  const showFilteredResults = (filters) => {

    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters

    }
    getProducts(variables)
    setSkip(0)

  }

  const updateSearchTerms = (newSearchTerm) => {

    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    }

    setSkip(0)
    setSearchTerms(newSearchTerm)

    getProducts(variables)
  }



  return (
    <div className="page">
      {userData.customer ? (
          <><Header/>
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
            <SearchResultView
                refreshFunction={updateSearchTerms}
            />
          </div>

            <Banner/>
            <Feature/>
            <div className="inspired_product_area section_gap_bottom_custom">
              <div className="container">
                <div className="row justify-content-center text-dark">
                  <div className="col-lg-12">
                    <div className="main_title text-dark">
                      <h2><span className="text-dark">Inspired products</span></h2>
                      <p>Bring called seed first of third give itself now ment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {Products.length === 0 ?
                <div>
                </div> :
                <div>
                  <Row gutter={[16, 16]}>

                    {renderCards}

                  </Row>


                </div>
            }
            <br /><br />

            {PostSize >= Limit &&
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={onLoadMore}>Load More</button>
            </div>
            }
            {/*<Allproduct/>*/}
            <Footer/>
          </>
      ) : (
        <>
          <Header />
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
          <SearchResultView
              refreshFunction={updateSearchTerms}
          /></div>




          <Banner/>
          <Feature/>
          {Products.length === 0 ?
            <div>
            </div> :
            <div>
              <Row gutter={[16, 16]}>
                <div className="inspired_product_area section_gap_bottom_custom">
                  <div className="container">
                    <div className="row justify-content-center text-dark">
                      <div className="col-lg-12">
                        <div className="main_title text-dark">
                          <h2><span className="text-dark">Inspired products</span></h2>
                          <p>Bring called seed first of third give itself now ment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {renderCards}

              </Row>


            </div>
        }
          <br /><br />

          {PostSize >= Limit &&
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={onLoadMore}>Load More</button>
          </div>
          }
          {/*<h2>You are not logged in</h2>*/}
          {/*<Link to="/login">Log in</Link>*/}
          {/*<Allproduct/>*/}
          <Footer/>
        </>
      )}
    </div>
  );
}
