interface JWT {
  secretExpiration: number
  refreshExpiration: number
}

export default <JWT>{
  secretExpiration: 3600,
  refreshExpiration: 604800,

  // TESTING
  // secretExpiration: 1,
  // refreshExpiration: 604800,
}
