import TermsConditionsEditor from "@/components/(adminDashboard)/(setting)/TermsConditions/TermsConditionsEditor";
import { Card } from "antd";
import React from "react";

const TermsConditions = () => {
  return (
    <Card className='shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
      <TermsConditionsEditor></TermsConditionsEditor>
    </Card>
  );
};

export default TermsConditions;
