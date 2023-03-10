import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editCartItem, updateCartItem } from "../Redux/actions/cartActions";
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "500px",
        width: "100%",
    },
};

Modal.setAppElement("#root");

const ProductModal = ({ isOpen, onRequestClose, setModal, classId, product, update }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.Cart.cartItems);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    useEffect(() => {
        const getAllOptions = async () => {
            try {
                const { data } = await axios.get(`/api/v1/option/${classId}`);
                setOptions(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllOptions();
    }, [classId]);

    useEffect(() => {
        // Check if product is already in the cart
        const cartItem = cartItems.find((item) => item.product === product);
        if (cartItem) {
            setQuantity(cartItem.qty);
            setSelectedOption(cartItem.option);
        }
    }, [cartItems, product]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const addToCartHandler = (e) => {
        e.preventDefault();
        const cartItem = cartItems.find((item) => item.product === product);
        if (cartItem && update) {
            dispatch(editCartItem(product, selectedOption, quantity));
        } else {
            setQuantity(0);
            dispatch(addToCart(product, quantity, selectedOption));
        }
        setModal(false);
    };
    useEffect(() => {
        if (!isOpen) {
            setQuantity(0);
        }
    }, [setModal])


    return (
        <Modal isOpen={isOpen} style={customStyles}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Select Product Options</h2>
                <button onClick={() => setModal(false)}>Close</button>
            </div>
            <form onSubmit={addToCartHandler}>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="option">
                        Option:
                    </label>
                    <select
                        className="w-full border border-gray-300 p-2 rounded"
                        name="option"
                        id="option"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        {options.length > 0 ? (
                            <>
                                {options.map((option, index) => {
                                    return (
                                        <option key={index} value={option._id}>
                                            {option.option_name}
                                        </option>
                                    );
                                })}
                                {" "}<option value="" >None</option>

                            </>
                        ) : (
                            <option value="" disabled>
                                No Option Available
                            </option>
                        )}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="quantity">
                        Quantity:
                    </label>
                    <input
                        className="w-full border border-gray-300 p-2 rounded"
                        type="number"
                        name="quantity"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    type="submit"
                >
                    Add to Cart
                </button>
            </form>
        </Modal>
    );
};

export default ProductModal;
