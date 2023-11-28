import React, { SyntheticEvent, useEffect, useState } from "react";
import "./AdminPanel.css";
import { ButtonId } from "./AdminPanelProps";
import SingleModal from "../Modals/SingleModal";
import typeService from "../../services/type.service";
import brandService from "../../services/brand.service";
import { useActions } from "../../hooks/useActions";

export default function AdminPanel() {
  const [buttonId, setButtonId] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const { setBrands, setTypes } = useActions();

  useEffect(() => {
    try {
      typeService.fetchTypes().then((data) => {
        setTypes(data);
      });
      brandService.fetchBrands().then((data) => {
        setBrands(data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handleModal = (event: any) => {
    setButtonId(event.target.id);
    setIsActive(true);
  };

  const closeModal = () => {
    setIsActive(false);
  };

  return (
    <>
      <form className="admin-panel" onSubmit={submitHandler}>
        <div className="flex-container admin-panel-wrapper">
          <button id={ButtonId.addType} onClick={handleModal}>
            Add type
          </button>
          <button id={ButtonId.addBrand} onClick={handleModal}>
            Add brand
          </button>
        </div>
        <div className="flex-container admin-panel-wrapper">
          <button id={ButtonId.deleteType} onClick={handleModal}>
            Delete type
          </button>
          <button id={ButtonId.deleteBrand} onClick={handleModal}>
            Delete brand
          </button>
        </div>
      </form>
      <SingleModal
        active={isActive}
        closeWindow={closeModal}
        action={buttonId}
      />
    </>
  );
}
