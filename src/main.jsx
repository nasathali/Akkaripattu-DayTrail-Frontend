import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  MapPin,
  Search,
  Plus,
  Check,
  Trash2,
  Compass,
  CalendarDays,
  Map,
  X,
  ArrowLeft,
  Navigation,
  UserRound,
  LogIn,
  LogOut,
  UserPlus,
  LayoutDashboard,
  ShieldAlert,
} from "lucide-react";

import "./style.css";

import akkaraiViewImage from "./assets/AKP.webp";
import beachImage from "./assets/beach.jpg";
import mosqueImage from "./assets/mosque.jpg";
import busstandImage from "./assets/busstand.jpg";
import marketImage from "./assets/market.jpg";
import foodcityImage from "./assets/foodcity.jpg";
import waterparkImage from "./assets/waterpark.jpg";
import universityImage from "./assets/university.jpg";
import templeImage from "./assets/temple.jpg";
import lighthouseImage from "./assets/lighthouse.jpg";
import collegeImage from "./assets/school.jpg";

const initialPlaces = [
  {
    id: 1,
    name: "Akkaraipattu Beach",
    category: "Nature",
    distance: "About 2.0 km",
    description: "Enjoy coastal views, the sea and fresh air.",
    image: beachImage,
  },
  {
    id: 2,
    name: "Akkaraipattu Central Mosque",
    category: "Religious",
    distance: "About 50 m",
    description: "An important local religious landmark.",
    image: mosqueImage,
  },
  {
    id: 3,
    name: "Main Bus Stand",
    category: "Local Landmark",
    distance: "About 1.5 km",
    description: "A central transport landmark in the town.",
    image: busstandImage,
  },
  {
    id: 4,
    name: "Akkaraipattu Market",
    category: "Shopping",
    distance: "About 0.4 km",
    description: "Explore a local market and shopping area.",
    image: marketImage,
  },
  {
    id: 5,
    name: "Akkaraipattu Food City",
    category: "Shopping",
    distance: "About 0.6 km",
    description: "A convenient stop for everyday shopping.",
    image: foodcityImage,
  },
  {
    id: 6,
    name: "Akkaraipattu Water Park",
    category: "Recreation",
    distance: "About 1.8 km",
    description: "A recreational place to explore.",
    image: waterparkImage,
  },
  {
    id: 7,
    name: "South Eastern University",
    category: "Education",
    distance: "About 9.5 km",
    description: "A higher education institution located in Oluvil, Sri Lanka.",
    image: universityImage,
  },
  {
    id: 8,
    name: "Buddhist Temple, Ampara",
    category: "Religious",
    distance: "About 25 km",
    description:
      "A Buddhist place of worship at 7MVP+464, Saddhatissa Mawatha, Ampara, Sri Lanka.",
    image: templeImage,
  },
  {
    id: 9,
    name: "Akkaraipattu Oluvil Lighthouse, Oluvil",
    category: "Nature",
    distance: "About 11 km",
    description:
      "A lighthouse in Oluvil, known for its coastal setting and maritime significance.",
    image: lighthouseImage,
  },
  {
    id: 10,
    name: "Akkaraipattu Muslim Central College",
    category: "Education",
    distance: "About 0.1 km",
    description: "A school providing education to students in Akkaraipattu.",
    image: collegeImage,
  },
];

export function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tab, setTab] = useState("places");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [imageErrors, setImageErrors] = useState([]);

  const [authView, setAuthView] = useState("none");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const [places, setPlaces] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("daytrail-demo-places")) ||
        initialPlaces
      );
    } catch {
      return initialPlaces;
    }
  });

  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceCategory, setNewPlaceCategory] = useState("Nature");
  const [newPlaceDistance, setNewPlaceDistance] = useState("About 1.0 km");
  const [newPlaceDesc, setNewPlaceDesc] = useState("");

  const [users, setUsers] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("daytrail-demo-users")) || [
          {
            name: "Admin User",
            email: "admin@daytrail.com",
            password: "admin123",
          },
        ]
      );
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("daytrail-demo-user")) || null;
    } catch {
      return null;
    }
  });

  const [plan, setPlan] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("akkaripattu-daytrail-plan")) || []
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("akkaripattu-daytrail-plan", JSON.stringify(plan));
    } catch (error) {
      console.error("Could not save the day plan:", error);
    }
  }, [plan]);

  useEffect(() => {
    try {
      localStorage.setItem("daytrail-demo-places", JSON.stringify(places));
    } catch (error) {
      console.error("Could not save places:", error);
    }
  }, [places]);

  const categories = ["All", ...new Set(places.map((place) => place.category))];

  const filtered = useMemo(() => {
    return places.filter((place) => {
      const matchesSearch = place.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesCategory = category === "All" || place.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [places, query, category]);

  const showPlaces = () => {
    setAuthView("none");
    setAuthMessage("");
    setTab("places");
    setSelectedPlace(null);
    setTimeout(() => {
      document.getElementById("content")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  const openPlace = (place) => {
    setAuthView("none");
    setSelectedPlace(place);
    setTab("places");
    setTimeout(() => {
      document.getElementById("content")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  const addToPlan = (place) => {
    setPlan((currentPlan) => {
      if (currentPlan.some((item) => item.id === place.id)) {
        return currentPlan;
      }
      return [...currentPlan, place];
    });
  };

  const removeFromPlan = (id) => {
    setPlan((currentPlan) => currentPlan.filter((place) => place.id !== id));
  };

  const openAuth = (view) => {
    setAuthView(view);
    setAuthMessage("");
    setAuthName("");
    setAuthEmail("");
    setAuthPassword("");
    setSelectedPlace(null);
    setTimeout(() => {
      document.getElementById("content")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    const email = authEmail.trim().toLowerCase();
    if (authView === "register") {
      if (!authName.trim()) {
        setAuthMessage("Please enter your name.");
        return;
      }
      if (users.some((user) => user.email === email)) {
        setAuthMessage("This email is already registered. Please log in.");
        return;
      }
      const newUser = {
        name: authName.trim(),
        email,
        password: authPassword,
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("daytrail-demo-users", JSON.stringify(updatedUsers));
      const loggedInUser = {
        name: newUser.name,
        email: newUser.email,
      };
      setCurrentUser(loggedInUser);
      localStorage.setItem("daytrail-demo-user", JSON.stringify(loggedInUser));
      setAuthView("none");
      setAuthMessage("");
      setAuthName("");
      setAuthEmail("");
      setAuthPassword("");
      return;
    }
    const matchedUser = users.find(
      (user) => user.email === email && user.password === authPassword,
    );
    if (!matchedUser) {
      setAuthMessage("Incorrect email or password. Please try again.");
      return;
    }
    const loggedInUser = {
      name: matchedUser.name,
      email: matchedUser.email,
    };
    setCurrentUser(loggedInUser);
    localStorage.setItem("daytrail-demo-user", JSON.stringify(loggedInUser));
    setAuthView("none");
    setAuthMessage("");
    setAuthName("");
    setAuthEmail("");
    setAuthPassword("");
  };

  const logout = () => {
    localStorage.removeItem("daytrail-demo-user");
    setCurrentUser(null);
    setAuthView("none");
    setAuthMessage("");
    setTab("places");
  };

  const handleAddPlace = (e) => {
    e.preventDefault();
    if (!newPlaceName.trim() || !newPlaceDesc.trim()) return;
    const newPlace = {
      id: Date.now(),
      name: newPlaceName.trim(),
      category: newPlaceCategory,
      distance: newPlaceDistance,
      description: newPlaceDesc.trim(),
      image: beachImage,
    };
    setPlaces([newPlace, ...places]);
    setNewPlaceName("");
    setNewPlaceDesc("");
    alert("New place added successfully!");
  };

  const handleDeletePlace = (id) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      setPlaces(places.filter((p) => p.id !== id));
    }
  };

  const isAdmin = currentUser?.email === "admin@daytrail.com";

  const renderPlaceCard = (place) => {
    const isAdded = plan.some((item) => item.id === place.id);
    const hasImageError = imageErrors.includes(place.id);
    return (
      <article
        className="card"
        key={place.id}
        onClick={() => openPlace(place)}
        onKeyDown={(event) => {
          if (event.key === "Enter") openPlace(place);
        }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${place.name}`}
        style={{ cursor: "pointer" }}
      >
        {!hasImageError ? (
          <img
            className="place-image"
            src={place.image}
            alt={`Photo of ${place.name}`}
            loading="lazy"
            onError={() => {
              setImageErrors((current) =>
                current.includes(place.id) ? current : [...current, place.id],
              );
            }}
          />
        ) : (
          <div className="image-fallback">
            <MapPin size={30} />
            <span>Image unavailable</span>
          </div>
        )}
        <div className="cardtop">
          <span className="symbol">
            <MapPin size={21} />
          </span>
          <span className="pill">{place.category}</span>
        </div>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <div className="cardfoot">
          <span>{place.distance}</span>
          <button
            className={isAdded ? "added" : "add"}
            onClick={(event) => {
              event.stopPropagation();
              if (isAdded) {
                setSelectedPlace(null);
                setTab("plan");
                setAuthView("none");
              } else {
                addToPlan(place);
              }
            }}
          >
            {isAdded ? (
              <>
                <Check size={15} /> Added
              </>
            ) : (
              <>
                <Plus size={15} /> Add to plan
              </>
            )}
          </button>
        </div>
        <div style={{ marginTop: "12px", color: "#087e6d", fontWeight: 700 }}>
          View map & details →
        </div>
      </article>
    );
  };

  const mapQuery = selectedPlace ? `${selectedPlace.name}, Sri Lanka` : "";
  const directionsUrl = selectedPlace
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`
    : "#";

  return (
    <div className="shell">
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          onClick={() => {
            setTab("places");
            setSelectedPlace(null);
            setAuthView("none");
          }}
        >
          <span className="brand-icon">
            <Compass size={25} />
          </span>
          <span>
            <b>Akkaripattu</b> <small>DAYTRAIL</small>
          </span>
        </a>
        <nav>
          <button
            className={tab === "places" && authView === "none" ? "active" : ""}
            onClick={showPlaces}
          >
            Explore places
          </button>
          <button
            className={tab === "map" && authView === "none" ? "active" : ""}
            onClick={() => {
              setSelectedPlace(null);
              setAuthView("none");
              setTab("map");
            }}
          >
            <Map size={15} /> Map
          </button>
          <button
            className={tab === "plan" && authView === "none" ? "active" : ""}
            onClick={() => {
              setSelectedPlace(null);
              setAuthView("none");
              setTab("plan");
            }}
          >
            My day plan <span className="count">{plan.length}</span>
          </button>
          {currentUser && (
            <button
              className={
                tab === "user-dashboard" && authView === "none" ? "active" : ""
              }
              onClick={() => {
                setSelectedPlace(null);
                setAuthView("none");
                setTab("user-dashboard");
              }}
            >
              <LayoutDashboard size={15} /> Dashboard
            </button>
          )}
          {isAdmin && (
            <button
              className={
                tab === "admin-dashboard" && authView === "none" ? "active" : ""
              }
              onClick={() => {
                setSelectedPlace(null);
                setAuthView("none");
                setTab("admin-dashboard");
              }}
              style={{ color: "#bd3434", fontWeight: 700 }}
            >
              <ShieldAlert size={15} /> Admin Panel
            </button>
          )}
          {currentUser ? (
            <>
              <span className="user-welcome">
                <UserRound size={15} /> {currentUser.name}
              </span>
              <button onClick={logout}>
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => openAuth("login")}>
                <LogIn size={15} /> Login
              </button>
              <button onClick={() => openAuth("register")}>
                <UserPlus size={15} /> Register
              </button>
            </>
          )}
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              <MapPin size={15} /> AKKARAIPATTU, SRI LANKA
            </span>
            <h1>
              Discover. Plan. <br /> <em>Explore.</em>
            </h1>
            <p>
              Your simple guide to discovering local places and planning a day
              around Akkaraipattu.
            </p>
            <button className="primary" onClick={showPlaces}>
              Explore places <span>→</span>
            </button>
          </div>

          <div className="art">
            <img
              src={akkaraiViewImage}
              alt="A beautiful view of Akkaraipattu"
              className="art-image"
            />
            <div className="art-label">Discover Akkaraipattu</div>
          </div>
        </section>

        <section className="stats">
          <div>
            <b>{places.length}</b> <span>Total places</span>
          </div>
          <div>
            <b>1 day</b> <span>Trip planning</span>
          </div>
          <div>
            <b>Local</b> <span>Akkaraipattu area</span>
          </div>
        </section>

        <section className="content" id="content">
          {authView !== "none" ? (
            <div className="place-details auth-card">
              <button
                className="back-button"
                onClick={() => {
                  setAuthView("none");
                  setAuthMessage("");
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <span className="eyebrow" style={{ marginTop: "22px" }}>
                AKKARIPATTU DAYTRAIL
              </span>
              <h2>
                {authView === "login" ? "Welcome back!" : "Create your account"}
              </h2>
              <p>
                {authView === "login"
                  ? "Login to your DayTrail demo account."
                  : "Register to get started with DayTrail."}
              </p>
              <form onSubmit={handleAuthSubmit}>
                {authView === "register" && (
                  <label className="auth-field">
                    Full name
                    <input
                      type="text"
                      value={authName}
                      onChange={(event) => setAuthName(event.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </label>
                )}
                <label className="auth-field">
                  Email address
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(event) => setAuthEmail(event.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="auth-field">
                  Password
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(event) => setAuthPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete={
                      authView === "login" ? "current-password" : "new-password"
                    }
                    minLength={4}
                    required
                  />
                </label>
                {authMessage && (
                  <p className="auth-message" role="alert">
                    {authMessage}
                  </p>
                )}
                <button className="primary auth-submit" type="submit">
                  {authView === "login" ? (
                    <>
                      <LogIn size={17} /> Login
                    </>
                  ) : (
                    <>
                      <UserPlus size={17} /> Create account
                    </>
                  )}
                </button>
                <p className="auth-switch">
                  {authView === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    setAuthView(authView === "login" ? "register" : "login");
                    setAuthMessage("");
                    setAuthPassword("");
                  }}
                >
                  {authView === "login" ? "Register here" : "Go to Login"}
                </button>
              </form>
              <p className="notice">
                Demo admin login: <b>admin@daytrail.com</b> / <b>admin123</b>
              </p>
            </div>
          ) : selectedPlace && tab === "places" ? (
            <div className="place-details">
              <button className="back-button" onClick={showPlaces}>
                <ArrowLeft size={16} /> Back to places
              </button>
              <span className="eyebrow" style={{ marginTop: "22px" }}>
                {selectedPlace.category}
              </span>
              <h2>{selectedPlace.name}</h2>
              <p>{selectedPlace.description}</p>
              <div className="distance">
                <MapPin size={18} /> {selectedPlace.distance} from the local
                reference area
              </div>
              {!imageErrors.includes(selectedPlace.id) && (
                <img
                  src={selectedPlace.image}
                  alt={`Photo of ${selectedPlace.name}`}
                  style={{
                    width: "100%",
                    maxHeight: "320px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    margin: "12px 0",
                  }}
                  onError={() => {
                    setImageErrors((current) =>
                      current.includes(selectedPlace.id)
                        ? current
                        : [...current, selectedPlace.id],
                    );
                  }}
                />
              )}
              <h3>Location map</h3>
              <p>
                This map searches for the place by name. Check the marker to
                confirm the exact location.
              </p>
              <iframe
                className="details-map"
                title={`Map for ${selectedPlace.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                loading="lazy"
                allowFullScreen
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "18px",
                }}
              >
                <a
                  className="directions-button"
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Navigation size={17} /> Get Directions
                </a>
                <button
                  className={
                    plan.some((item) => item.id === selectedPlace.id)
                      ? "added"
                      : "add"
                  }
                  onClick={() => addToPlan(selectedPlace)}
                >
                  {plan.some((item) => item.id === selectedPlace.id) ? (
                    <>
                      <Check size={15} /> Added to plan
                    </>
                  ) : (
                    <>
                      <Plus size={15} /> Add to plan
                    </>
                  )}
                </button>
              </div>
              <p className="notice" style={{ marginTop: "20px" }}>
                Distances are approximate and have not been calculated from your
                current location. Verify the location and route in Google Maps
                before travelling.
              </p>
            </div>
          ) : tab === "user-dashboard" ? (
            <div className="dashboard-container">
              <div className="heading">
                <div>
                  <span className="eyebrow">USER PROFILE & DASHBOARD</span>
                  <h2>Welcome, {currentUser?.name || "Explorer"}!</h2>
                  <p>Manage your account activity and saved day itinerary.</p>
                </div>
              </div>
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "repeat(2, 1fr)",
                  marginBottom: "30px",
                }}
              >
                <div className="card" style={{ cursor: "default" }}>
                  <h3>Account Details</h3>
                  <p>
                    <b>Name:</b> {currentUser?.name}
                  </p>
                  <p>
                    <b>Email:</b> {currentUser?.email}
                  </p>
                  <p>
                    <b>Role:</b>{" "}
                    {isAdmin ? "Administrator" : "Standard Explorer"}
                  </p>
                </div>
                <div className="card" style={{ cursor: "default" }}>
                  <h3>Itinerary Summary</h3>
                  <p>
                    <b>Places in Plan:</b> {plan.length} locations
                  </p>
                  <button
                    className="primary"
                    style={{ marginTop: "12px" }}
                    onClick={() => setTab("plan")}
                  >
                    View My Day Plan →
                  </button>
                </div>
              </div>
            </div>
          ) : tab === "admin-dashboard" && isAdmin ? (
            <div className="dashboard-container">
              <div className="heading">
                <div>
                  <span className="eyebrow">ADMIN CONTROL PANEL</span>
                  <h2>Manage Akkarai DayTrail</h2>
                  <p>Add new tourist locations or monitor registered users.</p>
                </div>
              </div>
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  marginBottom: "30px",
                }}
              >
                <div className="card" style={{ cursor: "default" }}>
                  <h3>Total Places</h3>
                  <b style={{ fontSize: "28px", color: "#087e6d" }}>
                    {places.length}
                  </b>
                </div>
                <div className="card" style={{ cursor: "default" }}>
                  <h3>Total Users</h3>
                  <b style={{ fontSize: "28px", color: "#087e6d" }}>
                    {users.length}
                  </b>
                </div>
                <div className="card" style={{ cursor: "default" }}>
                  <h3>Saved in Plans</h3>
                  <b style={{ fontSize: "28px", color: "#087e6d" }}>
                    {plan.length}
                  </b>
                </div>
              </div>
              <div className="place-details" style={{ marginBottom: "30px" }}>
                <h3>Add New Place</h3>
                <form
                  onSubmit={handleAddPlace}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: "15px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Place Name"
                    value={newPlaceName}
                    onChange={(e) => setNewPlaceName(e.target.value)}
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #dce8e2",
                    }}
                  />
                  <select
                    value={newPlaceCategory}
                    onChange={(e) => setNewPlaceCategory(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #dce8e2",
                    }}
                  >
                    <option value="Nature">Nature</option>
                    <option value="Religious">Religious</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Recreation">Recreation</option>
                    <option value="Education">Education</option>
                    <option value="Local Landmark">Local Landmark</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Approx Distance (e.g. About 3.5 km)"
                    value={newPlaceDistance}
                    onChange={(e) => setNewPlaceDistance(e.target.value)}
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #dce8e2",
                    }}
                  />
                  <textarea
                    placeholder="Short Description"
                    value={newPlaceDesc}
                    onChange={(e) => setNewPlaceDesc(e.target.value)}
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #dce8e2",
                      minHeight: "80px",
                    }}
                  />
                  <button type="submit" className="primary">
                    Add Place to Database
                  </button>
                </form>
              </div>
              <h3>Manage Existing Places ({places.length})</h3>
              <div className="planlist" style={{ marginTop: "15px" }}>
                {places.map((place) => (
                  <div className="planrow" key={place.id}>
                    <div className="placeinfo">
                      <b>{place.name}</b>
                      <small>
                        {place.category} · {place.distance}
                      </small>
                    </div>
                    <button
                      className="remove"
                      onClick={() => handleDeletePlace(place.id)}
                      title="Delete place"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : tab === "map" ? (
            <>
              <div className="heading">
                <div>
                  <span className="eyebrow">FIND YOUR WAY</span>
                  <h2>Explore the map</h2>
                  <p>General map of the Akkaraipattu area.</p>
                </div>
              </div>
              <p className="notice">
                This is a general area map, not verified pins for each place.
                Please verify exact locations before travelling.
              </p>
              <div className="map">
                <iframe
                  title="OpenStreetMap map of Akkaraipattu"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=81.78%2C7.18%2C81.90%2C7.28&layer=mapnik"
                  loading="lazy"
                />
              </div>
              <a
                className="maplink"
                href="https://www.openstreetmap.org/#map=14/7.219/81.856"
                target="_blank"
                rel="noreferrer"
              >
                Open larger map ↗
              </a>
            </>
          ) : tab === "plan" ? (
            <>
              <div className="heading">
                <div>
                  <span className="eyebrow">YOUR ITINERARY</span>
                  <h2>My day plan</h2>
                  <p>Your selected places are saved in this browser.</p>
                </div>
              </div>
              {plan.length === 0 ? (
                <div className="empty">
                  <CalendarDays size={36} />
                  <h3>Your plan is empty</h3>
                  <p>Explore places and press “Add to plan” to begin.</p>
                  <button className="primary" onClick={showPlaces}>
                    Browse places →
                  </button>
                </div>
              ) : (
                <div className="planlist">
                  {plan.map((place, index) => (
                    <div className="planrow" key={place.id}>
                      <span className="step">{index + 1}</span>
                      <div className="placeinfo">
                        <b>{place.name}</b>
                        <small>
                          {place.category} · {place.distance}
                        </small>
                      </div>
                      <button
                        className="remove"
                        onClick={() => removeFromPlan(place.id)}
                        aria-label={`Remove ${place.name}`}
                        title="Remove from plan"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                  <div className="plan-actions">
                    <button
                      className="secondary"
                      onClick={() => window.print()}
                    >
                      Print my day plan
                    </button>
                    <button
                      className="clear-plan"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Remove all places from your day plan?",
                          )
                        ) {
                          setPlan([]);
                        }
                      }}
                    >
                      <X size={15} /> Clear plan
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="heading">
                <div>
                  <span className="eyebrow">START EXPLORING</span>
                  <h2>Places to discover</h2>
                  <p>Click a place to see its map and directions.</p>
                </div>
                <span className="result">{filtered.length} places</span>
              </div>
              <div className="filters">
                <label className="search">
                  <Search size={18} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search a place..."
                    aria-label="Search places"
                  />
                </label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  aria-label="Filter by category"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <p className="notice">
                Distances are approximate and should be verified. Please confirm
                exact locations and visitor details before travelling.
              </p>
              {filtered.length > 0 ? (
                <div className="grid">{filtered.map(renderPlaceCard)}</div>
              ) : (
                <div className="empty">
                  <Search size={30} />
                  <h3>No places found</h3>
                  <p>Try another search or category.</p>
                  <button
                    className="secondary"
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section className="cta">
          <div>
            <span className="eyebrow">MAKE THE MOST OF YOUR DAY</span>
            <h2>Your town. Your day. Your journey.</h2>
            <p>Choose places and create a simple local visit plan.</p>
          </div>
          <button
            onClick={() => {
              setSelectedPlace(null);
              setAuthView("none");
              setTab("plan");
              document.getElementById("content")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            View my plan →
          </button>
        </section>
      </main>

      <footer>
        <div>
          <b>Akkaraipattu DayTrail</b>
          <p>Discover. Plan. Explore. Akkaraipattu in One Day.</p>
        </div>
        <span>© 2026 Akkaripattu DayTrail · Promoting Local Tourism</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
