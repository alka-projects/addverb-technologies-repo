import React, {useState, useEffect} from 'react';
import "../components-css/home.css";
import { Container, Button, Table } from "react-bootstrap";
import { DataService } from '../service';
import { toast } from 'react-toastify';

function Home() {
  const [data, setData] = useState([])

  const getData = async () => {
    await DataService.getData().then(res => {
      if (res.status === 200) {
        setData(res.data);
        toast.success("Data Load Successfully")
      } else {
        toast.error(res.data.message)
      }
    }) .catch (err => {
      toast.error(err.response.data)
    })
  }
  console.log(data)
  useEffect(() => {
    getData();
  }, [])
    return (
        <div>
        <h1 className="fw-bold text-decoration-underline">
          List of countries in Asia
        </h1>
        <Container>
          <Table striped bordered hover variant="dark">
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
                data ? data.map((dataVal) => {
                // {console.log(log(dataVAl))}
                  return (
                    <tr>
                    <td>1</td>
                    <td>{dataVal.name.official}</td>
                    <td>{dataVal.capital}</td>
                    <td><img src={dataVal.flags.png} alt="" /></td>
                    <td>{dataVal.region}</td>
                    <td>{dataVal.subregion}</td>
                    <td>{dataVal.population}</td>
                    <td>{dataVal.borders.map((bdr) => (
                      <p>{bdr}</p>
                    ))}</td>
                    <td>{Object.keys(dataVal.languages).map((bdr) => { 
                      return (
                        <p>
                          {dataVal.languages[bdr]}                    

                        </p>
                      )                     
                    })}</td>
                  </tr>
                  )
                }) : "Loading..."
              }             
            </tbody>
          </Table>
          <center>
            {" "}
            <Button variant="success">Refresh data</Button>{" "}
          </center>
        </Container>
      </div>
    )
}

export default Home
