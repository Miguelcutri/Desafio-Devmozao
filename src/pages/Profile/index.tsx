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
  AncoraRepo,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { formatDate } from "./FormatDate";

export default function Profile() {
  const { dataRepository, dataDeveloper } = useContext(GithubDataContext);
  const navigate = useNavigate();

  const sortedStars = dataRepository?.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
  return (
    <Container>
      <DataProfile>
        <ImageProfile>
          <img src={dataDeveloper?.avatar} height={300} width={300} />
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
        {dataDeveloper && dataDeveloper.blog.length > 0 && (
          <h3>
            🔗
            <Ancora href={dataDeveloper && dataDeveloper.blog} target="_blank">
              Blog
            </Ancora>
          </h3>
        )}
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
              <Title key={item.id}>
                <AncoraRepo href={item.html_url} target="_blank">
                  {item.name}
                </AncoraRepo>
              </Title>
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
