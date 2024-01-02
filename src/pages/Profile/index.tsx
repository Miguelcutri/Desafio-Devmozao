import { useContext } from "react";
import { Button } from "../../components/Button/styles";
import { GithubDataContext } from "../..";
import {
  Container,
  DataProfile,
  ImageProfile,
  FlexContainer,
  ProfileStats,
  AlignButton,
  Repositorys,
  ProfileStatsRepository,
  Line,
} from "./styles";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { data } = useContext(GithubDataContext);
  const navigate = useNavigate();

  return (
    <Container>
      <DataProfile>
        <ImageProfile>
          <img
            src="https://picsum.photos/200/300?random=1"
            height={300}
            width={300}
          />
        </ImageProfile>
        <h2>Developer full name</h2>
        {data && data?.login}
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          inventore
        </p>
        <FlexContainer>
          <ProfileStats>200 Follows</ProfileStats>
          <ProfileStats>200 Follows</ProfileStats>
          <ProfileStats>200 Follows</ProfileStats>
        </FlexContainer>
        <h3>Organization</h3>
        <h3>Location</h3>
        <h3>Email</h3>
        <h3>Site</h3>
        <h3>Twitter</h3>
        <AlignButton>
          <Button
            isActive
            onClick={() => {
              navigate("/");
            }}
          >
            Voltar
          </Button>
        </AlignButton>
      </DataProfile>
      <Repositorys>
        <h2>Repository Name</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum facere
          voluptatem, sit totam sapiente illum voluptatibus commodi cupiditate
          fugiat quibusdam. Ipsam nobis quibusdam fugiat perspiciatis itaque
          vitae dolorum iure beatae?
        </p>
        <FlexContainer>
          <ProfileStatsRepository>100 stars</ProfileStatsRepository>
          <ProfileStatsRepository>Updated 30 days ago</ProfileStatsRepository>
        </FlexContainer>
        <Line />
      </Repositorys>
    </Container>
  );
}
