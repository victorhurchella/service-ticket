import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 50;

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(4px);
`;

export const Content = styled.div`
  width: auto;
  height: auto;

  padding: 12px 56px 32px;

  border-radius: 4px;
  border: 1px solid #999;
  backdrop-filter: blur(4px);

  color: #eee;
  background-color: rgba(0, 0, 0, 0.9);

  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const InlineSection = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

export const InlineText = styled.span``;

export const SectionLabel = styled.h3`
  padding: 0;
  margin: 0 8px 0 0;
`;

export const Text = styled.p`
  max-width: 400px;
  overflow-wrap: break-word;
`;

export const HistoryContainer = styled.div`
  margin-top: 8px;
  height: 200px;
  overflow-y: auto;
  border: 1px solid #555;
  border-radius: 4px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th,
  td {
    border-bottom: 1px solid #444;
    padding: 8px;
    text-align: left;
  }

  th {
    position: sticky;
    top: 0;
    background-color: rgba(0, 0, 0, 0.95);
    z-index: 1;
  }

  tr:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;
