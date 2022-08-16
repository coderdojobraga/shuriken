import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth, withAuth } from "~/components/Auth";
import * as USER from "~/lib/user";
import { Col, Row, Title} from "antd";
import AppLayout from "~/components/layouts/AppLayout";

import {
  getEventByID,
  createAvailability,
  createEnrollment
} from "~/lib/api";

function Event() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState([]);
  
  const registerUserOnEvent = (is_available) => {
    switch (user.role) {
      case USER.ROLES.NINJA:
        createEnrollment(user.ninja_id, event.id, false).catch((error) =>
          notification["error"](error.data?.errors)
        );
        break;

      case USER.ROLES.MENTOR:
        createAvailability(user.mentor_id, event.id, is_available).catch((error) =>
          notification["error"](error.data?.errors)
        );
        break;
    }
  };

  useEffect(() => {
    getEventByID(id)
    .then((response) => setEvent(response.data))
    .catch((error) => notification["error"](error.data?.errors));
  }, []);

  const breakpoints = {
    xs: 24,
    md: 12,
    xl: 8,
    xxl: 6,
  };

  return (
    <AppLayout>
      <Row justify="start">
        <Col {...breakpoints}>
          <Title level={3}>{event.name}</Title>
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Event);
