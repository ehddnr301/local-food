import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import useInput from "../Components/useInput";
import Input from "../Components/Input";
import { useHistory, Redirect } from "react-router-dom";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import backgroundMore from "../Images/backgroundMore.jpg";
import useTypeInput from "../Components/useTypeInput";

const NaverMapTag = styled(NaverMap)`
  width: 100%;
  height: 90%;
`;

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${backgroundMore});
`;

const FormWrapper = styled.div`
  width: 60%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
`;

const Explain = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid white;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Address = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: white;
`;

const Move = styled.div`
  margin-top: 10px;
  cursor: pointer;
  color: white;
  font-size: 18px;
  background-color: #2ecc71;
  padding: 1.5% 5% 1%;
  border-radius: 10px;
`;

const Form = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Button = styled.button`
  cursor: pointer;
  width: 60%;
  padding: 2% 5% 1%;
  border: 0;
  border-radius: 10px;
  outline: none;
  color: white;
  background-color: #2ecc71;
  font-family: "Jua", sans-serif;
  font-size: 20px;
`;

// TODO : input validation ?
const MoreStore = (): JSX.Element => {
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: localStorage.getItem("currentLat") || 37.5665,
    lng: localStorage.getItem("currentLng") || 126.978,
  });
  const [currentAddress, setCurrentAddress] = useState("");
  const storeName = useInput("");
  const storeType = useTypeInput("");
  const location = useInput("");
  const description = useInput("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    makeStore();
  };
  const makeStore = async () => {
    const userId = localStorage.getItem("user");
    try {
      setIsSuccess(true);

      const { data } = await axios.post("http://localhost:4000/store/list", {
        storeName: storeName.value,
        storeType: storeType.value,
        location: location.value,
        description: description.value,
        id: userId,
      });
      if (data === "Success") {
        alert("추가에 성공하였습니다.");
      } else {
        alert("추가에 실패하였습니다.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(isSuccess);
    }
  };

  const getAddress = async (lat: number, lng: number) => {
    const { data } = await axios.post(
      "http://localhost:4000/store/reverseGeo",
      {
        lat,
        lng,
      }
    );
    setCurrentAddress(data);
  };
  const moveAddress = () => {
    location.setValue(currentAddress);
  };

  useEffect(() => {
    const lat = parseFloat(localStorage.getItem("currentLat"));
    const lng = parseFloat(localStorage.getItem("currentLng"));
    if (currentAddress === "") {
      getAddress(lat, lng);
    }

    if (currentLocation.lat === 37.5665) {
      console.log("hi");
      setCurrentLocation({ lat, lng });
    }
    console.log(lat, lng);
  }, [currentLocation]);

  return isSuccess ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <FormWrapper>
        <Explain>
          <RenderAfterNavermapsLoaded
            ncpClientId={process.env.REACT_APP_NAVER_CLIENT}
          >
            <NaverMapTag
              defaultCenter={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              defaultZoom={17}
            >
              <Marker
                position={{
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                }}
              />
            </NaverMapTag>
          </RenderAfterNavermapsLoaded>
          <Address>{`현재위치 : ${currentAddress}`}</Address>
          <Move onClick={moveAddress}>주소사용하기</Move>
        </Explain>
        <Form>
          <form onSubmit={handleSubmit}>
            <Input placeholder={"가게이름🚀"} {...storeName}></Input>
            <Input
              placeholder={"가게종류를 선택해주세요"}
              required
              list="type"
              {...storeType}
            ></Input>
            <datalist id="type">
              <option value="pub">주점</option>
              <option value="restaurant">음식점</option>
              <option value="cafe">카페</option>
            </datalist>
            <Input placeholder={"주소"} {...location}></Input>
            <Input
              placeholder={"간단한 설명 부탁드려요🙏"}
              {...description}
            ></Input>
            <Button type="submit">추가하기</Button>
          </form>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default MoreStore;
