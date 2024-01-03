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
  Ancora,
  RepositoriesContainer,
  Description,
  Title,
  FlexContainerRepository,
} from "./styles";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { dataRepository, dataDeveloper } = useContext(GithubDataContext);
  const navigate = useNavigate();

  function formatDate(dateString: string) {
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
  }

  const sortedStars = dataRepository?.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
  return (
    <Container>
      <DataProfile>
        <ImageProfile>
          <img src={dataDeveloper?.avatar_url} height={300} width={300} />
        </ImageProfile>
        <h2>{dataDeveloper && dataDeveloper.name}</h2>@
        {dataDeveloper && dataDeveloper.login}
        <p>{dataDeveloper && dataDeveloper.bio}</p>
        <FlexContainer>
          <ProfileStats>
            👥 {dataDeveloper && dataDeveloper.followers} followers
          </ProfileStats>
          <ProfileStats>
            💕 {dataDeveloper && dataDeveloper.following} following
          </ProfileStats>
        </FlexContainer>
        <h3>🏢 {dataDeveloper && dataDeveloper.company}</h3>
        <h3>📍 {dataDeveloper && dataDeveloper.location}</h3>
        <h3>
          🔗
          <Ancora href={dataDeveloper && dataDeveloper.blog}> Linkedin</Ancora>
        </h3>
        <AlignButton>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Voltar
          </Button>
        </AlignButton>
      </DataProfile>
      <RepositoriesContainer>
        {sortedStars &&
          sortedStars.map((item) => (
            <Repositorys>
              <Title key={item.id}>{item.name}</Title>
              <Description>{item.description}</Description>
              <FlexContainerRepository>
                <ProfileStatsRepository>
                  ⭐️ {item.stargazers_count} Stars
                </ProfileStatsRepository>
                <ProfileStatsRepository>
                  📆 {formatDate(item.updated_at)}
                </ProfileStatsRepository>
              </FlexContainerRepository>
              <Line />
            </Repositorys>
          ))}
      </RepositoriesContainer>
    </Container>
  );
}
