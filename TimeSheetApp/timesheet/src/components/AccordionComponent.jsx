import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, styled, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SummaryTypography = styled(AccordionSummary)({
    fontWeight: 500,
    fontSize: "22px",
    color:"#FFFF"
});

const DetailsTypography = styled(AccordionDetails)({
    fontWeight: 700,
    fontSize: "16px",
    color:"#FFFF"
});

const TextTypography = styled(Typography)({
    fontWeight: 500,
    fontSize: "16px",
    color:"#BDBDBD",
    paddingLeft:"15px"
});

const AccordionComponent = ({ content }) => { 

    return (
        <>
            {content?.map((data, index) => (
                <React.Fragment key={index}>
                    <Box>
                        <TextTypography>
                            {data?.headerTitle}
                        </TextTypography>
                        <Accordion sx={{ backgroundColor: "#0159A3", boxShadow: "none" }}>
                            <SummaryTypography
                                expandIcon={<ArrowForwardIosIcon  sx={{color:"#009FE3"}}/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                {data?.title}
                            </SummaryTypography>
                            <DetailsTypography>
                                {data?.content}
                            </DetailsTypography>
                        </Accordion>
                    </Box>
                    <Box sx={{display:"flex" , justifyContent:"center" , marginBottom:"20px" , marginTop:"20px" }}>
                    {index < content.length - 1 && <Divider sx={{width:"80%" , borderColor:"#FFFF"}} />}
                    </Box>
                </React.Fragment>
            ))}
        </>
    );
};

export default AccordionComponent;
