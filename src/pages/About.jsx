import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Divider,
} from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="xxl">
      <Box py={6} display="flex" justifyContent="center">
        <Card sx={{ border: "none", boxShadow: "inherit" }}>
          <CardContent>
       
            <Typography variant="h3" fontWeight="bold" sx={{pb: 4}}>
              About Us
            </Typography>



          
            <Typography variant="body1" paragraph>
              The <b>Project Management Dashboard</b> is built with{" "}
              <b>React.js</b> and <b>Material UI</b>. It enables users to manage
              projects, track progress, analyze data, and maintain productivity
              — all in one place.
            </Typography>

            <Typography variant="body1" paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              quisquam facere delectus quam harum voluptates pariatur saepe
              eaque, cum vitae dolorum explicabo. Adipisci odit officia dolorem
              natus sint doloremque et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              quisquam facere delectus quam harum voluptates pariatur saepe
              eaque, cum vitae dolorum explicabo. Adipisci odit officia dolorem
              natus sint doloremque et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              quisquam facere delectus quam harum voluptates pariatur saepe
              eaque, cum vitae dolorum explicabo. Adipisci odit officia dolorem
              natus sint doloremque et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              quisquam facere delectus quam harum voluptates pariatur saepe
              eaque, cum vitae dolorum explicabo. Adipisci odit officia dolorem
              natus sint doloremque et.
            </Typography>

             <Typography variant="body1" paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              quisquam facere delectus quam harum voluptates pariatur saepe
              eaque, cum vitae dolorum explicabo. Adipisci odit officia dolorem
              natus sint doloremque et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              quisquam facere delectus quam harum voluptates pariatur saepe
              eaque, cum vitae dolorum explicabo. Adipisci odit officia dolorem
              natus sint doloremque et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              quisquam facere delectus quam harum voluptates pariatur saepe
              eaque, cum vitae dolorum explicabo. Adipisci odit officia dolorem
              natus sint doloremque et. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              quisquam facere delectus quam harum voluptates pariatur saepe
              eaque, cum vitae dolorum explicabo. Adipisci odit officia dolorem
              natus sint doloremque et.
            </Typography>

            <Divider sx={{ my: 3 }} />

           
            <Typography
              variant="body2"
              color="text.secondary"

              sx={{ mt: 2 }}
            >
              Built by <b>Tahir Mansoor</b> © {new Date().getFullYear()}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
