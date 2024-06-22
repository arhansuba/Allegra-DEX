// helper.js

/**
 * Example utility function to generate a random ID
 * @returns {string} Random ID
 */
function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  /**
   * Example utility function to validate an email format
   * @param {string} email Email address to validate
   * @returns {boolean} True if valid email format, false otherwise
   */
  function isValidEmail(email) {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Example utility function to validate a password strength
   * @param {string} password Password to validate
   * @returns {boolean} True if password meets criteria, false otherwise
   */
  function isValidPassword(password) {
    // Password validation criteria (example)
    return password.length >= 8;
  }
  
  module.exports = {
    generateRandomId,
    isValidEmail,
    isValidPassword
  };
  