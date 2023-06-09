/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { priceOptions } from "../../Utils/select-options";
import { setYelpUrl } from "../../Services/api.service";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormComponent = (props) => {
  const { data, setData } = props;
  const { location, price } = data;
  const navigate = useNavigate();

  const getYelpData = async (dataObject) => {
    const { location, price } = dataObject;
    const url = setYelpUrl(location, price);
    console.log(url);

    try {
      const { data } = await axios.get(url);
      console.log(data);
      navigate({
        pathname: "game",
        search: createSearchParams({
          location,
          price,
        }).toString(),
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (

    <Form className="home-form"
      onSubmit={(e) => {
        e.preventDefault();
        getYelpData(data);
        props.createLink(e);
      }}
    >
      <Form.Group className="mb-3 form-grp" controlId="formlocation">
        <Form.Label>Location: </Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Brooklyn, NY"
          name="location"
          autoComplete="off"
          value={location}
          onChange={(e) =>
            setData({
              ...data,
              location: e.target.value,
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3 form-grp" controlId="formprice">
        <Form.Label>Price: </Form.Label>
        <Select
          required
          className="select"
          options={priceOptions}
          // defaultValue={priceOptions[0]}
          name="price"
          onChange={(e) =>
            setData({
              ...data,
              price: e.value,
            })
          }
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "hotpink",
              primary: "black",
            },
          })}
        />
      </Form.Group>

      <Button className="start-btn" type="submit">
        Start
      </Button>
    </Form>

  );
};

export default FormComponent;
