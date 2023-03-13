import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Loader = ({ setLoading }) => {
    const [progress, setProgress] = useState(1);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(null);
    const [display, setDisplay] = useState(true);
    useEffect(() => {
        const newTimer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    setLoading(false);
                    navigate("/menu");
                    return 0;
                }
                const diff = 1;
                return Math.min(oldProgress + diff, 100);
            });
        }, 100);
        setTimer(newTimer);

        return () => {
            clearInterval(newTimer);
        };
    }, [navigate, setLoading]);

    const handleStopLoading = () => {
        clearInterval(timer);
        setProgress(0);
        setDisplay(false);
    };

    return (
        <>
            {display ? (
                <section
                    className="loader"
                    style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                    }}
                >
                    <div className="progress__wrapper">
                        <div
                            className="flex__btn"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "15px",
                            }}
                        >
                            <button
                                style={{
                                    padding: "8px 25px",
                                    border: "1px solid rgb(255, 255, 255)",
                                    color: "rgb(255, 255, 255)",
                                    background: "transparent",
                                    fontSize: "18px",
                                    fontFamily: "Oswald",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                                onClick={handleStopLoading}
                            >
                                Stop Loading <ImCross />{" "}
                            </button>
                        </div>
                        <LinearProgress variant="determinate" value={progress} />
                    </div>
                </section>
            ) : (
                false
            )}
        </>
    );
};

export default Loader;
