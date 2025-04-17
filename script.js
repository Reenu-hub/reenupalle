document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const calculateBtn = document.getElementById('calculate');
    const resultsDiv = document.getElementById('results');
    
    // Calculation Constants
    const ELECTRICITY_FACTOR = 0.85; // lbs CO2 per kWh
    const GAS_FACTOR = 11.7;         // lbs CO2 per therm
    const GASOLINE_FACTOR = 19.6;    // lbs CO2 per gallon
    const FLIGHT_FACTOR = 90;        // lbs CO2 per flight hour
    
    const DIET_FOOTPRINTS = {
        'vegan': 1100,
        'vegetarian': 1400,
        'meat-light': 1800,
        'meat-heavy': 2500
    };
    
    // Event Listeners
    calculateBtn.addEventListener('click', calculateFootprint);
    
    // Calculation Functions
    function calculateFootprint() {
        // Get input values
        const electricity = parseFloat(document.getElementById('electricity').value) || 0;
        const gas = parseFloat(document.getElementById('gas').value) || 0;
        const miles = parseFloat(document.getElementById('miles').value) || 0;
        const mpg = parseFloat(document.getElementById('mpg').value) || 1;
        const flights = parseFloat(document.getElementById('flights').value) || 0;
        const diet = document.getElementById('diet').value;
        
        // Calculate each category
        const home = calculateHome(electricity, gas);
        const transport = calculateTransport(miles, mpg, flights);
        const food = calculateFood(diet);
        const total = home + transport + food;
        
        // Display results
        displayResults(home, transport, food, total);
    }
    
    function calculateHome(electricity, gas) {
        // Convert monthly to annual and calculate
        return (electricity * ELECTRICITY_FACTOR * 12) + (gas * GAS_FACTOR * 12);
    }
    
    function calculateTransport(miles, mpg, flights) {
        // Calculate vehicle emissions
        const gallons = miles / mpg;
        const vehicleEmissions = gallons * GASOLINE_FACTOR;
        
        // Calculate flight emissions
        const flightEmissions = flights * FLIGHT_FACTOR;
        
        return vehicleEmissions + flightEmissions;
    }
    
    function calculateFood(diet) {
        return DIET_FOOTPRINTS[diet] || 2000;
    }
    
    function displayResults(home, transport, food, total) {
        // Format numbers with commas
        const format = num => Math.round(num).toLocaleString();
        
        // Update DOM
        document.getElementById('home-result').textContent = `${format(home)} lbs CO₂`;
        document.getElementById('transport-result').textContent = `${format(transport)} lbs CO₂`;
        document.getElementById('food-result').textContent = `${format(food)} lbs CO₂`;
        document.getElementById('total-result').textContent = `${format(total)} lbs CO₂`;
        
        // Show results
        resultsDiv.style.display = 'block';
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
});