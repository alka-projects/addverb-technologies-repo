import React, {useState, useEffect} from 'react';
import "../components-css/home.css";
import { Container, Button, Table } from "react-bootstrap";
import { DataService } from '../service';
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

function Home() {
  const [data, setData] = useState([])
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");
  const [count, setCount] = useState(0)

  const override = css`
  display: block;
  margin: 200% 540%;
  border-color: white;
`;

  const getData = async () => {
    setLoading(false)
    await DataService.getData().then(res => {
      if (res.status === 200) {
        setData(res.data);
        toast.success("Data Load Successfully")
        setLoading(true)
      } else {
        toast.error(res.data.message)
      }
    }) .catch (err => {
      toast.error(err.response.data)
    })
  }
  const refresh = () => {
    getData();
  }
  useEffect(() => {
    getData();
  }, [])
    return (
        <div>
        <h1 className="fw-bold text-decoration-underline">
          List of countries in Asia
        </h1>
        <Container>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Capital</th>
                <th>Flag</th>
                <th>Region</th>
                <th>Sub-region</th>
                <th>Population</th>
                <th>Borders</th>
                <th>Languages</th>
              </tr>
            </thead>
            <tbody>
              {
                loading  ? data.map((dataVal, i) => {
                  return (
                    <tr>
                    <td>{i+1}</td>
                    <td>{dataVal.name.official}</td>
                    <td>{dataVal.capital}</td>
                    <td><img src={dataVal.flags.png} alt="" /></td>
                    <td>{dataVal.region}</td>
                    <td>{dataVal.subregion}</td>
                    <td>{dataVal.population}</td>
                    <td>{dataVal.borders}</td>
                    <td>{Object.keys(dataVal.languages).map((bdr) => { 
                      return (
                        <p>
                          {dataVal.languages[bdr]}
                        </p>
                      )                     
                    })}</td>
                  </tr>
                  )
                }) : 
                  <FadeLoader loading={true} css={override} size={50} />
              }             
            </tbody>
          </Table>
          <center>
            {" "}
            <Button variant="success" onClick={refresh} className='m-5'>Refresh data</Button>{" "}
          </center>
        </Container>
      </div>
    )
}

export default Home
