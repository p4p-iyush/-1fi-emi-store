import { formatINR } from "../constants";

function EmiPlanList({ plans, selectedPlan, onSelectPlan }) {
  return (
    <div className="emi-plan-list">
      {plans.map((plan) => {
        const isSelected = selectedPlan?.tenure === plan.tenure;

        return (
          <div
            key={plan.tenure}
            className={`emi-plan-row ${isSelected ? "emi-plan-selected" : ""}`}
            onClick={() => onSelectPlan(plan)}
          >
            <input
              type="radio"
              name="emi-tenure"
              checked={isSelected}
              onChange={() => onSelectPlan(plan)}
            />

            <div className="emi-plan-detail">
              <p className="emi-plan-amount">
                {formatINR(plan.monthly_emi)}
                <span> / month · {plan.tenure} months</span>
              </p>
              <p className="emi-plan-rate">{plan.interest_rate}% interest</p>
            </div>

            {Number(plan.cashback) > 0 && (
              <span className="cashback-tag">
                {formatINR(plan.cashback)} cashback
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default EmiPlanList;