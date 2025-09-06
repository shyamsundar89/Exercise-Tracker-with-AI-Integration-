import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  text-align: center;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  width: 100%;
  justify-content: center;
  
  @media (max-width: 850px) {
    grid-template-columns: 1fr; /* Single column on small screens */
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 56.25%; /* Aspect ratio 16:9 */
  height: 0;
  overflow: hidden;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const Caption = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 400;
`;

const Tutorials = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Watch Intro Videos</Title>
        <VideoGrid>
          <VideoWrapper>
            <VideoContainer>
              {/* <Iframe
                src="Intro"
                title="Intro YouTube Video"
                allowFullScreen
              /> */}
              <iframe width="560" height="315" src="https://www.youtube.com/embed/WDIpL0pjun0?si=dDh8o-higwE2HV3C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </VideoContainer>
            <Caption>Intro: Video 1</Caption>
          </VideoWrapper>
          <VideoWrapper>
            <VideoContainer>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/n69-eVLtevc?si=DHpiVKhthZ9fCcFT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </VideoContainer>
            <Caption>Intro: Video 2</Caption>
          </VideoWrapper>
          <VideoWrapper>
            <VideoContainer>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/EwFGCG4QIQA?si=WuS3dUHmqU9GQdHY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </VideoContainer>
            <Caption>Intro: Video 3</Caption>
          </VideoWrapper>
          <VideoWrapper>
            <VideoContainer>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/woOqmpbFkuQ?si=sinn-1pA2C-Fphni" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </VideoContainer>
            <Caption>Intro: Video 4</Caption>
          </VideoWrapper>
        </VideoGrid>
      </Wrapper>
    </Container>
  );
};

export default Tutorials;
