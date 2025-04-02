let counters = {
  all: 0,
  daily: 0,
  weekly: 0,
  monthly: 0,
  lastUpdate: null
};

exports.handler = async (event) => {
  const now = new Date();
  
  // Reset daily/weekly/monthly if needed
  if (!counters.lastUpdate || new Date(counters.lastUpdate).getDate() !== now.getDate()) {
      counters.daily = 0;
  }
  if (!counters.lastUpdate || new Date(counters.lastUpdate).getDay() !== now.getDay()) {
      counters.weekly = 0;
  }
  if (!counters.lastUpdate || new Date(counters.lastUpdate).getMonth() !== now.getMonth()) {
      counters.monthly = 0;
  }

  // Increment counters
  counters.all++;
  counters.daily++;
  counters.weekly++;
  counters.monthly++;
  counters.lastUpdate = now.toISOString();

  return {
      statusCode: 200,
      body: JSON.stringify(counters)
  };
};