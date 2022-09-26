import { AppShell, Footer, Group, Header, Text } from "@mantine/core"

export const ApplicationContainer = ({ children }) => {
  return (
    <AppShell
      styles={{
        main: {
          background: "#fff",
          width: "100vw",
          height: "100vh",
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          margin: 0,
          padding: 0
        }
      }}
      fixed
      footer={
        <div>

        </div>
        // <Footer height={50} p="sm">
        //   <Group position="apart" spacing="xl">
        //   <Text size="sm"><span style={{ fontWeight: "bolder" }}>Phava</span></Text>
        //   <a  
        //     href="https://www.bhattlab.com/"
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     style = {{ color: "inherit", textDecoration: "none" }}
        //   >
        //     <Text size="sm">Bhatt Lab &#128169; Stanford School of Medicine</Text>
        //   </a>
        //   </Group>
        // </Footer>
      }
    >
      {children}
    </AppShell>
  )
}