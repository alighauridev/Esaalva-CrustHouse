import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: !theme.palette.mode === "dark" ? "#ff8c00" : "#ff8c00",
    fontFamily: "'Oswald'",
    fontSize: "1.5rem",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid #ff8c00",
    background: "#000",
}));
const MenuItem = ({ item }) => {
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const navigate = useNavigate();
    return (
        <>
            <div className="item">
                <div className="img">
                    <img
                        src={
                            item.products.length > 0
                                ? item?.products[0]?.image
                                : "https://images.unsplash.com/photo-1596665338750-dcb6aacff410?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2UlMjBub3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        }
                        alt=""
                    />
                </div>
                <Accordion
                    expanded={true}
                    onChange={handleChange(`panel${item._id}`)}
                >
                    <AccordionSummary
                        aria-controls={`panel${item._id}d-content`}
                        id={`panel${item._id}d-header`}
                    >
                        <Typography>{item.type}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <ul>
                                {item.products.length > 0 ? (
                                    <>
                                        {item.products.map((product, ind) => {
                                            return (
                                                <li onClick={() => navigate(`/${product._id}`)}>
                                                    <div className="start">
                                                        <img src={product.image} alt="" />
                                                    </div>
                                                    <div className="end">
                                                        <p>{product.name}</p> <span>${product.price}</span>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <p>No Items Available</p>
                                )}
                            </ul>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
};

export default MenuItem;
