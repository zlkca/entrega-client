
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import ProductCategoryGrid from "../../components/product/ProductCategoryGrid";
import { categoryAPI } from "../../services/categoryAPI";
import PageContainer from "../../components/PageContainer";
import { TopBar } from "../../components/TopBar";


export default function ProductListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [catMap, setCatMap] = useState();


    useEffect(() => {
          categoryAPI.fetchCategoryMap({}).then((r) => {
            if (r.status == 200) {
              setCatMap(r.data);
            }
          });
    }, []);

    return (
        <PageContainer>
            <TopBar />
            <ProductCategoryGrid categoryMap={catMap} />
        </PageContainer>
    );
}
